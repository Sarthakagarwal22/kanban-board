# MERN CRUD Application

This is a simple CRUD application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to create, read, update, and delete user information.

## Backend

The backend is built with Node.js and Express. It provides a RESTful API for managing user data.

### Setup

1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your MongoDB connection in `src/config/db.js`.
4. Start the server:
   ```
   npm start
   ```

### Endpoints

- `POST /api/users` - Create a new user
- `GET /api/users` - Retrieve all users
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

## Frontend

The frontend is built with React. It provides a user interface for interacting with the backend API.

### Setup

1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm start
   ```

### Features

- User registration and editing
- Display of user list
- Ability to delete users

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- Mongoose

## License

This project is licensed under the MIT License.