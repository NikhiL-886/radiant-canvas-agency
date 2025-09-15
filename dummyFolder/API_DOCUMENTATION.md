# 📚 SamTech Backend API Documentation

## 🔧 Base URL
```
http://localhost:3000/api
```

## 🔐 Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 👤 Authentication APIs

### 1. **User Registration**
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required, min 6 characters)"
}
```

**Response (Success - 201):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "Admin": false
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "Email already exists"
}
```

---

### 2. **User Login**
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "Admin": true/false
  }
}
```

**Response (Error - 401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. **User Logout**
```http
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### 4. **Google OAuth Login**
```http
POST /api/auth/google
```

**Request Body:**
```json
{
  "email": "string (required)",
  "username": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "Admin": false
  }
}
```

---

### 5. **Forgot Password**
```http
POST /api/auth/forget-password
```

**Request Body:**
```json
{
  "email": "string (required)"
}
```

**Response (Success - 200):**
```json
{
  "message": "Password reset email sent successfully"
}
```

---

### 6. **Reset Password**
```http
POST /api/auth/reset-password
```

**Request Body:**
```json
{
  "token": "string (required - from email)",
  "password": "string (required, min 6 characters)"
}
```

**Response (Success - 200):**
```json
{
  "message": "Password reset successful"
}
```

---

### 7. **Get User Profile**
```http
GET /api/auth/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success - 200):**
```json
{
  "message": "This is your profile",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "Admin": true/false
  }
}
```

---

## 📧 Contact Form APIs

### 1. **Submit Contact Form**
```http
POST /api/contact
```

**Request Body:**
```json
{
  "name": "string (required)",
  "email": "string (required)",
  "phone": "string (required)",
  "company": "string (optional)",
  "service": "string (optional)",
  "budget": "string (optional)",
  "timeline": "string (optional)",
  "projectDescription": "string (optional)"
}
```

**Response (Success - 201):**
```json
{
  "message": "Contact form submitted successfully",
  "contact": {
    "_id": "contact_id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Example Corp",
    "service": "Web Development",
    "budget": "$5000-$10000",
    "timeline": "2-3 months",
    "projectDescription": "Need a new website",
    "createdAt": "2025-09-15T10:30:00.000Z",
    "updatedAt": "2025-09-15T10:30:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "message": "Validation error",
  "error": "Name, email, and phone are required"
}
```

---

## 🔒 Admin Panel APIs
**Note:** All admin APIs require authentication AND admin privileges (`Admin: true`)

### 1. **Get All Users**
```http
GET /api/admin/users
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "user_id",
      "username": "john_doe",
      "email": "john@example.com",
      "Admin": false,
      "createdAt": "2025-09-15T10:30:00.000Z",
      "updatedAt": "2025-09-15T10:30:00.000Z"
    }
  ]
}
```

**Response (Error - 403):**
```json
{
  "message": "Access denied. Admin privileges required."
}
```

---

### 2. **Get All Contact Forms**
```http
GET /api/admin/contacts
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "contact_id",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "company": "Example Corp",
      "service": "Web Development",
      "budget": "$5000-$10000",
      "timeline": "2-3 months",
      "projectDescription": "Need a new website",
      "createdAt": "2025-09-15T10:30:00.000Z",
      "updatedAt": "2025-09-15T10:30:00.000Z"
    }
  ]
}
```

---

### 3. **Get Dashboard Statistics**
```http
GET /api/admin/stats
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "totalUsers": 25,
    "totalContacts": 45,
    "totalAdmins": 3,
    "recentContacts": 8,
    "recentUsers": 5
  }
}
```

---

### 4. **Delete User**
```http
DELETE /api/admin/users/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Parameters:**
- `id` (required): User ID to delete

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "You cannot delete your own account"
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

---

### 5. **Delete Contact Form**
```http
DELETE /api/admin/contacts/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Parameters:**
- `id` (required): Contact ID to delete

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Contact not found"
}
```

---

### 6. **Update User Admin Status**
```http
PATCH /api/admin/users/:id/admin
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Parameters:**
- `id` (required): User ID to update

**Request Body:**
```json
{
  "Admin": true/false
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "User promoted to admin successfully",
  "data": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "Admin": true
  }
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "You cannot remove admin status from your own account"
}
```

---

## 🔍 General API Information

### **Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### **Error Response Format**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

### **Authentication Flow**
1. Register/Login to get JWT token
2. Include token in Authorization header for protected routes
3. Admin routes require both authentication and admin privileges

### **Rate Limiting**
Currently no rate limiting implemented, but recommended for production.

### **CORS**
CORS is enabled for all origins in development.

---

## 📝 Example Usage

### **JavaScript Fetch Examples**

**Login:**
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
const token = data.token;
```

**Get Users (Admin):**
```javascript
const response = await fetch('/api/admin/users', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const users = await response.json();
```

**Submit Contact Form:**
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    company: 'Example Corp',
    service: 'Web Development',
    projectDescription: 'Need a new website'
  })
});

const result = await response.json();
```

---

## 🛡️ Security Notes

1. **Passwords** are hashed using bcrypt
2. **JWT tokens** have expiration (configure in environment)
3. **Admin routes** are protected by admin middleware
4. **Input validation** is implemented for all endpoints
5. **CORS** should be configured for specific origins in production
6. **Rate limiting** should be added for production use
7. **HTTPS** should be used in production

---

## 🌍 Environment Variables Required

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_for_password_reset
EMAIL_PASS=your_email_password_or_app_password
```

---

*Last Updated: September 15, 2025*