# Taskurist API

Taskurist is a task management API. It provides basic functionality for managing tasks, such as creating, reading, updating, and deleting tasks. The API also includes user authentication and authorization using JWT tokens. It's designed to help users keep track of their tasks and manage their workflow efficiently.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)

## Getting Started

To get this Taskurist API up and running locally, follow these steps.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v14 or higher) — Node.js is the runtime environment for running JavaScript server-side.
- **MongoDB** — MongoDB is used as the database to store tasks and user data. You can either run MongoDB locally or use a cloud-based solution like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation

1. **Clone the repository**:
   First, clone the repository to your local machine using Git:
   ```bashi```
   ```git clone https://github.com/yourusername/taskurist-api.git```
   ```cd taskurist-ap```

2. **Install dependencies**: 
    Next, run the following command to install all the required packages listed in package.json:
    ```npm install```
3. **Set up environment variables**:
    Create a .env file in the root directory and configure the necessary environment variables. This file will hold sensitive data like your 
    MongoDB connection string and JWT secret key.

    Example .env:
    ```PORT=3000```
    ```MONGODB_URI=mongodb+srv://eric:Gl4aPhYB3XNsUoKR@cluster0.jdytk.mongodb.net/taskurist?retryWrites=true&w=majority```
    ```JWT_SECRET=your_jwt_secret_key```

4. **Start the server**:
    Once the setup is complete, you can start the development server:
    ```npm run dev```