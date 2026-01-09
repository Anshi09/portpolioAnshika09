# API Contracts & Integration Plan

## Current Mock Data (Frontend Only)
Located in: `/app/frontend/src/data/mock.js`

### Static Data (No Backend Needed - Keep as Mock):
- `personalInfo` - Name, email, tagline, description
- `education` - M.Tech and B.Tech details
- `skills` - Programming, Mobile, Backend, AI/Data skills with levels
- `experience` - Deftsoft internship details
- `projects` - 4 projects with full details
- `testimonials` - 2 testimonials
- `socialLinks` - GitHub, LinkedIn, email

**Reason**: This is portfolio content that rarely changes, keeping it in frontend mock keeps the app fast and simple.

---

## Backend Implementation Required

### 1. Contact Form Submission

**API Endpoint**: `POST /api/contact`

**Request Body**:
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "company": "string (optional)",
  "projectType": "string (required) - mobile|web|aiml|dashboard|other",
  "budget": "string (optional) - under5k|5k-10k|10k-25k|25k-50k|over50k|discuss",
  "message": "string (required, min 10 chars)"
}
```

**Response Success (201)**:
```json
{
  "success": true,
  "message": "Thank you! Your message has been received.",
  "submissionId": "string"
}
```

**Response Error (400)**:
```json
{
  "success": false,
  "error": "Validation error message"
}
```

**MongoDB Model**: `ContactSubmission`
```python
{
  "id": str (uuid4),
  "name": str,
  "email": str,
  "company": str (optional),
  "projectType": str,
  "budget": str (optional),
  "message": str,
  "status": str (default: "new"), # new, read, replied, archived
  "submittedAt": datetime (auto),
  "ipAddress": str (optional, for spam prevention)
}
```

---

### 2. Get Contact Submissions (Admin - Optional for MVP)

**API Endpoint**: `GET /api/contact`

**Response (200)**:
```json
{
  "success": true,
  "count": 5,
  "submissions": [
    {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "company": "Tech Corp",
      "projectType": "mobile",
      "budget": "10k-25k",
      "message": "Looking for a React Native developer...",
      "status": "new",
      "submittedAt": "2025-01-09T08:00:00Z"
    }
  ]
}
```

---

## Frontend Integration Changes

### File: `/app/frontend/src/components/ContactSection.jsx`

**Current**: Mock submission with console.log and toast
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  if (validateForm()) {
    console.log('Form submitted:', formData);
    toast({ title: "Message Sent!", description: "..." });
    // Reset form
  }
};
```

**Change To**: Real API call
```javascript
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contact`, formData);
      toast({ 
        title: "Message Sent!", 
        description: response.data.message 
      });
      // Reset form
      setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
    } catch (error) {
      toast({ 
        title: "Error", 
        description: error.response?.data?.error || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }
};
```

**Add Loading State**: Disable submit button while submitting

---

## Implementation Steps

1. ✅ Create contracts.md (this file)
2. Create MongoDB model: `/app/backend/models/contact.py`
3. Create API routes: `/app/backend/routes/contact.py`
4. Update `/app/backend/server.py` to include contact routes
5. Integrate frontend: Update ContactSection.jsx with real API calls
6. Test with backend testing agent

---

## Notes
- Email validation on both frontend and backend
- Rate limiting consideration for contact form (prevent spam)
- Consider sending email notifications to anshika2695@gmail.com when new contact received (future enhancement)
- All other data (projects, skills, etc.) remains in mock.js for simplicity
