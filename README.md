# User Management Project

## Overview

This project is a user management system that allows users to perform CRUD (Create, Read, Update, Delete) operations on a list of users. It includes both a master view and a detailed view for user interaction.

## Features

### Master View

- List all users in a data grid.
- Perform CRUD operations:
  - New: Create a new user.
  - Edit: Edit an existing user (requires row selection).
  - Delete: Delete an existing user (requires row selection).

### Detailed View

- Display user details in a form.
- Two buttons:
  - Action: Performs the corresponding operation (Create, Save, or Delete).
  - Back: Navigates back to the master view.

### REST Service

- Provides a set of APIs following REST standards:
  - Returns all users.
  - Returns the user with the desired "id."
  - Saves a given user.
  - Updates data of the user with the desired "id."
  - Deletes the user with the desired "id."

## Technologies Used

### Backend

- Written in Go.
- SQLite used for the database.

### Frontend

- Written in TypeScript using React & Next.js.

## Project Structure

- `backend/`: Contains the Go backend code.
- `frontend/`: Contains the TypeScript, React, and Next.js frontend code.
- `appDB.db`: SQLite database file.

## Getting Started

Clone the repository.

## Getting Started with Backend

1. Navigate to the `backend` directory and run the Go server.
   ```bash
   cd backend
   go run main.go
   ```

2. Open your browser and access the application at [http://localhost:8080](http://localhost:8080).

## Getting Started with Frontend

1. Navigate to the `user-mangement-app` directory:
    ```bash
    cd user-mangement-app
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the Next.js app:
    ```bash
    npm run dev
    ```

4. Open your browser and access the application at [http://localhost:3000](http://localhost:3000).

## API Endpoints

- **GET** `/api/users`: Returns all users.
- **GET** `/api/users/{id}`: Returns the user with the specified "id."
- **POST** `/api/users`: Saves a new user.
- **PUT** `/api/users/{id}`: Updates data of the user with the specified "id."
- **DELETE** `/api/users/{id}`: Deletes the user with the specified "id."

## Note

Ensure that all operations are persistent, and the database file (`appDB.db`) is included in the project folder.

Feel free to reach out if you have any questions or need further assistance!
