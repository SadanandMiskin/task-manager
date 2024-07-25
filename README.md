# Task Manager

A full-stack Todo application that allows users to manage their tasks with features like authentication, Google sign-in, and CRUD operations. 

-  Nodejs - Backend
-  React - Frontend
-  MongoDB - database
-  Firebase - Google Auth
  
## Features

- User authentication with email/password and Google sign-in
- Create, read, update, and delete todos
- Search and filter todos
- Responsive design

## Table of Contents

- [Installation](#installation)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/SadanandMiskin/task-manager.git
   cd todo-app/backend 
2. Install dependencies:
    ```bash
    npm install
3. Create a `.env` file and add.
   ```bash
    JWT_SECRET=
    MONGODB_URI=
4. Run the server
   ```bash
   npm run dev

### Frontend

1. Open in another terminal:
   ```bash
   cd todo-app/frontend 
2. Install dependencies:
    ```bash
    npm install
3. Update the Backend URL in `src/services/api.js` to
     ```bash
       <backend_localhost_url>/api
4. Add Your firebase credentials for Authentication in `src/firebase.js`
4. Run the frontend
   ```bash
     npm run dev

## API Endpoints
### Authentication
- POST /api/auth/google-signin
  * Sign in with Google.
  * Request body: { email: String, displayName: String }
  * Response: { token: String }

- Todos
  * GET /api/todos

- Get all todos for the authenticated user.
  * Response: { todos: Array }
  * POST /api/todos

- Create a new todo.
  * Request body: { title: String, description: String }
  * Response: { todo: Object }
  * PUT /api/todos/:id

- Update an existing todo.
  * Request body: { title?: String, description?: String, status?: String }
  * Response: { todo: Object }
  * DELETE /api/todos/:id

* Delete a todo.
* Response: { message: String }
