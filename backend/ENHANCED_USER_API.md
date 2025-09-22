# Enhanced User API Documentation

This document describes the enhanced user management API endpoints for the Ubit Education Platform backend, including support for saved universities, test scores, documents, and comprehensive personal/academic information.

## Authentication

The API uses JWT tokens for authentication. Include the token in the `Authorization` header as `Bearer <token>`.

## User Data Structure

The enhanced user model now includes:

### Personal Information
- First Name, Last Name, Email, Phone, Date of Birth, Nationality

### Academic Information  
- GPA (out of 4), High School Name, Graduation Year, Intended Majors

### Areas of Interest
- Array of interest strings

### Test Scores
- Test name, score, date, max score, percentile

### Documents
- Document name, type, URL, upload date, status

### Saved Universities
- University ID, name, saved date, notes

## User Endpoints

### Authentication

#### POST /api/users/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "nationality": "Mongolian",
  "phone": "+976-12345678"
}
```

#### POST /api/users/login
Login an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Management

#### GET /api/users
Get all users (admin only).

#### GET /api/users/:id
Get user by ID.

#### DELETE /api/users/:id
Delete user (soft delete).

### Profile Management

#### GET /api/users/profile/me
Get current user's profile.

#### PUT /api/users/profile/me
Update current user's profile.

### Personal Information

#### PUT /api/users/personal-info
Update personal information.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+976-12345678",
  "dateOfBirth": "1995-01-15",
  "nationality": "Mongolian"
}
```

### Academic Information

#### PUT /api/users/academic-info
Update academic information.

**Request Body:**
```json
{
  "gpa": 3.8,
  "highSchoolName": "Ulaanbaatar International School",
  "graduationYear": 2024,
  "intendedMajors": ["Computer Science", "Software Engineering"]
}
```

### Areas of Interest

#### PUT /api/users/areas-of-interest
Update areas of interest.

**Request Body:**
```json
{
  "areasOfInterest": ["Programming", "Machine Learning", "Web Development", "Mobile Apps"]
}
```

## Test Scores Management

#### GET /api/users/test-scores/me
Get user's test scores.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "test_1",
      "testName": "TOEFL",
      "score": "108",
      "date": "2023-11-15T00:00:00.000Z",
      "maxScore": "120",
      "percentile": 85
    }
  ],
  "message": "Test scores retrieved successfully"
}
```

#### POST /api/users/test-scores
Add a new test score.

**Request Body:**
```json
{
  "testName": "SAT",
  "score": "1450",
  "date": "2023-10-01",
  "maxScore": "1600",
  "percentile": 92
}
```

#### PUT /api/users/test-scores/:testId
Update a test score.

**Request Body:**
```json
{
  "testName": "SAT",
  "score": "1500",
  "percentile": 95
}
```

#### DELETE /api/users/test-scores/:testId
Delete a test score.

## Documents Management

#### GET /api/users/documents/me
Get user's documents.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "doc_1",
      "name": "High School Transcript",
      "type": "transcript",
      "url": "/documents/transcript.pdf",
      "uploadedAt": "2024-09-01T00:00:00.000Z",
      "status": "verified"
    }
  ],
  "message": "Documents retrieved successfully"
}
```

#### POST /api/users/documents
Add a new document.

**Request Body:**
```json
{
  "name": "Personal Statement",
  "type": "essay",
  "url": "/documents/personal_statement.pdf"
}
```

**Document Types:**
- `transcript` - Academic transcripts
- `recommendation` - Recommendation letters
- `essay` - Personal statements/essays
- `portfolio` - Portfolio submissions
- `certificate` - Certificates
- `other` - Other documents

#### PUT /api/users/documents/:docId
Update a document.

**Request Body:**
```json
{
  "name": "Updated Personal Statement",
  "status": "verified"
}
```

#### DELETE /api/users/documents/:docId
Delete a document.

## Saved Universities Management

#### GET /api/users/saved-universities/me
Get user's saved universities.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "saved_1",
      "universityId": "mit",
      "universityName": "Massachusetts Institute of Technology",
      "savedAt": "2024-08-15T00:00:00.000Z",
      "notes": "Top choice - excellent CS program"
    }
  ],
  "message": "Saved universities retrieved successfully"
}
```

#### POST /api/users/saved-universities
Save a university.

**Request Body:**
```json
{
  "universityId": "mit",
  "universityName": "Massachusetts Institute of Technology",
  "notes": "Top choice - excellent CS program"
}
```

#### DELETE /api/users/saved-universities/:savedId
Remove a university from saved list.

## Application Management

#### GET /api/users/applications/me
Get user's applications.

#### POST /api/users/applications
Create a new application.

#### PUT /api/users/applications/:appId
Update an application.

#### DELETE /api/users/applications/:appId
Delete an application.

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "data": {},
  "message": "Error message here"
}
```

Common HTTP status codes:
- `400`: Bad Request (invalid input)
- `401`: Unauthorized (invalid credentials)
- `404`: Not Found (user/resource not found)
- `500`: Internal Server Error

## Data Validation

### Personal Information
- First Name: Required, max 50 characters
- Last Name: Required, max 50 characters
- Email: Required, valid email format
- Phone: Optional, valid phone number format
- Date of Birth: Optional, must be in the past
- Nationality: Optional, max 50 characters

### Academic Information
- GPA: Required, 0-4.0 range
- High School Name: Required, max 200 characters
- Graduation Year: Required, 1900 to current year + 10
- Intended Majors: Array of strings, max 100 characters each

### Test Scores
- Test Name: Required, max 100 characters
- Score: Required, string format
- Date: Required, valid date
- Max Score: Optional, string format
- Percentile: Optional, 0-100 range

### Documents
- Name: Required, max 200 characters
- Type: Required, must be one of: transcript, recommendation, essay, portfolio, certificate, other
- URL: Optional, string format
- Status: Default "draft", must be one of: draft, uploaded, verified, rejected

## Seeding Data

To seed the database with enhanced user data:

```bash
# Seed all data
npm run seed:all

# Or seed users specifically
npm run seed:users
```

## Environment Variables

Make sure to set these environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/ubit
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```

## Example Complete User Profile

```json
{
  "id": "user_id",
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "personalInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+976-12345678",
    "dateOfBirth": "1995-01-15T00:00:00.000Z",
    "nationality": "Mongolian"
  },
  "academicInfo": {
    "gpa": 3.8,
    "highSchoolName": "Ulaanbaatar International School",
    "graduationYear": 2024,
    "intendedMajors": ["Computer Science", "Software Engineering"]
  },
  "areasOfInterest": ["Programming", "Machine Learning", "Web Development"],
  "testScores": [
    {
      "id": "test_1",
      "testName": "TOEFL",
      "score": "108",
      "date": "2023-11-15T00:00:00.000Z",
      "maxScore": "120",
      "percentile": 85
    }
  ],
  "documents": [
    {
      "id": "doc_1",
      "name": "High School Transcript",
      "type": "transcript",
      "url": "/documents/transcript.pdf",
      "uploadedAt": "2024-09-01T00:00:00.000Z",
      "status": "verified"
    }
  ],
  "savedUniversities": [
    {
      "id": "saved_1",
      "universityId": "mit",
      "universityName": "Massachusetts Institute of Technology",
      "savedAt": "2024-08-15T00:00:00.000Z",
      "notes": "Top choice - excellent CS program"
    }
  ],
  "createdAt": "2024-12-01T00:00:00.000Z",
  "updatedAt": "2024-12-01T00:00:00.000Z"
}
```