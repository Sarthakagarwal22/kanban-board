# MERN CRUD Application

This is a simple CRUD application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to create, read, update, and delete user information.

## Features

- User registration with name, email, and age.
- Display a list of registered users.
- Edit user information.
- Delete user entries.

## Project Structure

```
mern-crud-app
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── userController.js
│   │   ├── models
│   │   │   └── user.js
│   │   ├── routes
│   │   │   └── userRoutes.js
│   │   └── config
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── UserForm.js
│   │   │   ├── UserList.js
│   │   │   └── UserEdit.js
│   │   ├── pages
│   │   │   ├── Home.js
│   │   │   └── EditUser.js
│   │   └── api
│   │       └── userApi.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-crud-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### API Endpoints

- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.