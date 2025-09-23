# User API Documentation

This document describes the user management API endpoints for the Ubit Education Platform backend.

## Authentication

The API uses JWT tokens for authentication. Include the token in the `Authorization` header as `Bearer <token>`.

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

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "nationality": "Mongolian",
      "phone": "+976-12345678",
      "preferences": null,
      "applications": [],
      "createdAt": "2024-12-01T00:00:00.000Z",
      "updatedAt": "2024-12-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "message": "User registered successfully"
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

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "nationality": "Mongolian",
      "phone": "+976-12345678",
      "preferences": {...},
      "applications": [...],
      "createdAt": "2024-12-01T00:00:00.000Z",
      "updatedAt": "2024-12-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}
```

### User Management

#### GET /api/users
Get all users (admin only).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sort` (optional): Sort field (default: "createdAt")
- `order` (optional): Sort order - "asc" or "desc" (default: "desc")

**Response:**
```json
{
  "success": true,
  "data": [...],
  "message": "Users retrieved successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### GET /api/users/:id
Get user by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  },
  "message": "User retrieved successfully"
}
```

#### DELETE /api/users/:id
Delete user (soft delete - sets isActive to false).

**Response:**
```json
{
  "success": true,
  "data": {},
  "message": "User deleted successfully"
}
```

### Profile Management

#### GET /api/users/profile/me
Get current user's profile.

**Headers:**
- `x-user-id`: User ID (for now, will be replaced with JWT token validation)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  },
  "message": "Profile retrieved successfully"
}
```

#### PUT /api/users/profile/me
Update current user's profile.

**Headers:**
- `x-user-id`: User ID (for now, will be replaced with JWT token validation)

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "nationality": "Mongolian",
  "phone": "+976-12345678",
  "preferences": {
    "countries": ["usa", "uk"],
    "programs": ["Computer Science"],
    "budget": {
      "min": 20000,
      "max": 50000,
      "currency": "USD"
    },
    "examScores": {
      "toefl": 100,
      "gre": 320
    }
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    ...
  },
  "message": "Profile updated successfully"
}
```

### Application Management

#### GET /api/users/applications/me
Get current user's applications.

**Headers:**
- `x-user-id`: User ID (for now, will be replaced with JWT token validation)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "app_1",
      "universityId": "mit",
      "program": "Computer Science",
      "status": "submitted",
      "documents": ["transcript", "recommendation_1"],
      "submittedAt": "2024-10-01T00:00:00.000Z",
      "deadline": "2025-01-01T00:00:00.000Z"
    }
  ],
  "message": "Applications retrieved successfully"
}
```

#### POST /api/users/applications
Create a new application.

**Headers:**
- `x-user-id`: User ID (for now, will be replaced with JWT token validation)

**Request Body:**
```json
{
  "universityId": "mit",
  "program": "Computer Science",
  "documents": ["transcript", "recommendation_1"],
  "deadline": "2025-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_1",
    "universityId": "mit",
    "program": "Computer Science",
    "status": "draft",
    "documents": ["transcript", "recommendation_1"],
    "deadline": "2025-01-01T00:00:00.000Z"
  },
  "message": "Application created successfully"
}
```

#### PUT /api/users/applications/:appId
Update an application.

**Headers:**
- `x-user-id`: User ID (for now, will be replaced with JWT token validation)

**Request Body:**
```json
{
  "status": "submitted",
  "submittedAt": "2024-12-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "app_1",
    "universityId": "mit",
    "program": "Computer Science",
    "status": "submitted",
    "submittedAt": "2024-12-01T00:00:00.000Z"
  },
  "message": "Application updated successfully"
}
```

#### DELETE /api/users/applications/:appId
Delete an application.

**Headers:**
- `x-user-id`: User ID (for now, will be replaced with JWT token validation)

**Response:**
```json
{
  "success": true,
  "data": {},
  "message": "Application deleted successfully"
}
```

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
- `404`: Not Found (user/application not found)
- `500`: Internal Server Error

## Seeding Data

To seed the database with sample users and visas:

```bash
# Seed all data
npm run seed:all

# Or seed individually
node seed-users.js
node seed-visas.js
```

## Environment Variables

Make sure to set these environment variables:

```env
MONGODB_URI=mongodb://localhost:27017/ubit
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
```