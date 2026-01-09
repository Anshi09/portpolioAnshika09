from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime
import uuid

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    projectType: str = Field(..., description="Type of project: mobile, web, aiml, dashboard, other")
    budget: Optional[str] = Field(None, description="Budget range")
    message: str = Field(..., min_length=10, max_length=2000)
    status: str = Field(default="new", description="Status: new, read, replied, archived")
    submittedAt: datetime = Field(default_factory=datetime.utcnow)
    ipAddress: Optional[str] = None

    @validator('projectType')
    def validate_project_type(cls, v):
        allowed_types = ['mobile', 'web', 'aiml', 'dashboard', 'other']
        if v not in allowed_types:
            raise ValueError(f'Project type must be one of: {", ".join(allowed_types)}')
        return v

    @validator('budget')
    def validate_budget(cls, v):
        if v is None:
            return v
        allowed_budgets = ['under5k', '5k-10k', '10k-25k', '25k-50k', 'over50k', 'discuss']
        if v not in allowed_budgets:
            raise ValueError(f'Budget must be one of: {", ".join(allowed_budgets)}')
        return v

    @validator('status')
    def validate_status(cls, v):
        allowed_statuses = ['new', 'read', 'replied', 'archived']
        if v not in allowed_statuses:
            raise ValueError(f'Status must be one of: {", ".join(allowed_statuses)}')
        return v

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=100)
    projectType: str
    budget: Optional[str] = None
    message: str = Field(..., min_length=10, max_length=2000)

    @validator('projectType')
    def validate_project_type(cls, v):
        allowed_types = ['mobile', 'web', 'aiml', 'dashboard', 'other']
        if v not in allowed_types:
            raise ValueError(f'Project type must be one of: {", ".join(allowed_types)}')
        return v

    @validator('budget')
    def validate_budget(cls, v):
        if v is None:
            return v
        allowed_budgets = ['under5k', '5k-10k', '10k-25k', '25k-50k', 'over50k', 'discuss']
        if v not in allowed_budgets:
            raise ValueError(f'Budget must be one of: {", ".join(allowed_budgets)}')
        return v

class ContactResponse(BaseModel):
    success: bool
    message: str
    submissionId: Optional[str] = None

class ContactListResponse(BaseModel):
    success: bool
    count: int
    submissions: list