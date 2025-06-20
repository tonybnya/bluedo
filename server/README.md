# Bluedo API

A RESTful API for the Bluedo task management application built with Express, TypeScript, and MongoDB.

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Run in production mode
npm start
```

## API Endpoints

### Authentication

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/auth/register` | Register a new user | `{ "username": "user", "password": "pass" }` | `{ "message": "User registered successfully" }` |
| `POST` | `/api/auth/login` | Login a user | `{ "username": "user", "password": "pass" }` | `{ "token": "jwt-token" }` |

### Tasks

All task endpoints require authentication via Bearer token in the Authorization header.
Also add `Content-Type: application/json` to the headers of each request.

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/tasks` | Get all tasks | - | Array of tasks |
| `GET` | `/api/tasks/:id` | Get a specific task | - | Task object |
| `POST` | `/api/tasks` | Create a new task | `{ "title": "Task", "description": "..." }` | Created task |
| `PUT` | `/api/tasks/:id` | Update a task | `{ "title": "Updated", "description": "..." }` | Updated task |
| `DELETE` | `/api/tasks/:id` | Delete a task | - | Status 204 (No Content) |

## Error Handling

- `400 Bad Request`: Missing required fields or invalid ID format
- `401 Unauthorized`: Invalid or missing authentication token
- `404 Not Found`: Resource not found

## Authentication

Authentication uses JWT (JSON Web Tokens). Include the token in requests as follows:

```
Authorization: Bearer your-jwt-token
```

## Data Models

### User

- `username`: String (required, unique)
- `password`: String (required, hashed)

### Task

- `title`: String (required)
- `description`: String
- `userId`: ObjectId (reference to User)
- `createdAt`: Date
- `updatedAt`: Date

## Testing

The API includes comprehensive test coverage with Jest and Supertest. Run tests with:

```bash
npm test
```

## Technologies

- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- Jest & Supertest for testing