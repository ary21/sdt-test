# SDT-Test Project

## Project Description

This project is an API server built with **Express.js** and **TypeScript**, utilizing **Prisma ORM** for database access and **Zod** for schema validation. The project includes API documentation using **Swagger** and unit testing with **Jest**.

## Project Structure

- **src/**: Main folder for all source code, including controllers, services, and models.
- **src/prisma/**: Contains the Prisma schema file (`schema.prisma`) and seed files for populating initial data.
- **tests/**: Contains unit test files using Jest to test functions in controllers and services.

## Features

- **TypeScript**: Provides type safety at runtime to improve code reliability.
- **Prisma ORM**: Simplifies integration and access to various types of databases.
- **Zod**: For validating input schemas in API endpoints.
- **Swagger**: Documents API endpoints with an interactive UI.
- **Jest**: A testing framework for unit and integration tests.

## Setup and Installation

### 1. Prerequisites
- **Node.js** v16 or newer
- **NPM** or **Yarn**

### 2. Clone the Project and Install Dependencies

```bash
git clone https://github.com/username/sdt-test.git
cd sdt-test
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root folder and adjust the following variables according to your database settings:

```dotenv
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### 4. Prisma Migration

Run the following command to migrate the Prisma schema to the database:

```bash
npx prisma migrate dev
```

### 5. Run Seed Data (Optional)

If you want to add initial seed data, run:

```bash
npx prisma db seed
```

## Running the Project

### Development
To run the server in development mode, use the following command:

```bash
npm run dev
```
The server will run using Nodemon and automatically reload when changes are made.

### Build and Run the Server
To build and run the server, use:

```bash
npm start
```

### Testing
This project uses Jest for testing. Use the following command to run all unit tests:

```bash
npm test
```

## API Documentation

API documentation is created using **Swagger** and can be accessed at the `/api-docs` endpoint while the server is running. Swagger automatically documents all endpoints and provides an interactive UI.


## NPM Scripts

| Command | Description                                                |
|---------|------------------------------------------------------------|
| `dev`   | Runs the server in development mode with Nodemon.         |
| `build` | Compiles the TypeScript project to JavaScript in the `dist` folder. |
| `start` | Builds the project and runs the server from the `dist` folder. |
| `test`  | Runs unit tests using Jest.                               |

## Dependencies

- **express**: The main framework for the REST API.
- **cors**: Middleware for handling CORS policies.
- **helmet**: Middleware to enhance the security of the server.
- **@prisma/client**: Prisma client for database access.
- **zod**: Library for schema validation.
- **swagger-jsdoc** and **swagger-ui-express**: For creating and accessing interactive API documentation.
