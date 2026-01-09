from fastapi import APIRouter, HTTPException, Request
from models.contact import ContactSubmission, ContactSubmissionCreate, ContactResponse, ContactListResponse
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])

# Database connection will be injected
db = None

def set_db(database):
    global db
    db = database

@router.post("", response_model=ContactResponse, status_code=201)
async def create_contact_submission(submission: ContactSubmissionCreate, request: Request):
    """
    Create a new contact form submission
    """
    try:
        # Get client IP address
        client_ip = request.client.host if request.client else None
        
        # Create submission object
        submission_data = submission.dict()
        contact_obj = ContactSubmission(**submission_data, ipAddress=client_ip)
        
        # Insert into database
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        
        logger.info(f"New contact submission received from {contact_obj.email}")
        
        return ContactResponse(
            success=True,
            message="Thank you for reaching out! I'll get back to you within 24-48 hours.",
            submissionId=contact_obj.id
        )
    except ValueError as ve:
        logger.error(f"Validation error: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form. Please try again later.")

@router.get("", response_model=ContactListResponse)
async def get_contact_submissions(
    status: str = None,
    limit: int = 100,
    skip: int = 0
):
    """
    Get all contact submissions (admin endpoint)
    Optional filters: status
    """
    try:
        query = {}
        if status:
            allowed_statuses = ['new', 'read', 'replied', 'archived']
            if status not in allowed_statuses:
                raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(allowed_statuses)}")
            query['status'] = status
        
        # Get submissions with pagination
        cursor = db.contact_submissions.find(query).sort('submittedAt', -1).skip(skip).limit(limit)
        submissions = await cursor.to_list(length=limit)
        
        # Get total count
        total_count = await db.contact_submissions.count_documents(query)
        
        # Remove MongoDB _id field
        for submission in submissions:
            submission.pop('_id', None)
        
        return ContactListResponse(
            success=True,
            count=total_count,
            submissions=submissions
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")

@router.get("/{submission_id}")
async def get_contact_submission(submission_id: str):
    """
    Get a specific contact submission by ID
    """
    try:
        submission = await db.contact_submissions.find_one({"id": submission_id})
        
        if not submission:
            raise HTTPException(status_code=404, detail="Contact submission not found")
        
        submission.pop('_id', None)
        return {"success": True, "submission": submission}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submission")

@router.patch("/{submission_id}/status")
async def update_submission_status(submission_id: str, status: str):
    """
    Update the status of a contact submission
    """
    try:
        allowed_statuses = ['new', 'read', 'replied', 'archived']
        if status not in allowed_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(allowed_statuses)}")
        
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact submission not found")
        
        return {"success": True, "message": "Status updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating submission status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update submission status")