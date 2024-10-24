# User Management Service

Welcome to the **User Management Service**, a robust web service designed to handle user-related operations. This service is part of a broader **Service-Oriented Architecture (SOA)** project. Built with modern libraries and best practices, it ensures security, scalability, and excellent performance.

## 🚀 Features

-   **User Registration**: Secure sign-ups with bcrypt for password hashing.
-   **CRUD Operations**: Manage user information with Create, Read, Update, and Delete operations.
-   **Comprehensive API Documentation**: Integrated Swagger documentation for easy API exploration.
-   **Logging & Testing**: Winston for logging, Jest for testing, and Supertest for API testing.
-   **In-Memory Database for Testing**: Utilizes `mongodb-memory-server` to provide a lightweight, fast, in-memory MongoDB instance for testing.
-   **Security**: Helmet, rate limiting, and bcrypt ensure the service is protected from common vulnerabilities.

## 🛠 Tech Stack

-   **Node.js**: The runtime environment.
-   **Express.js**: Web framework for building REST APIs.
-   **MongoDB + Mongoose**: Database and ODM for persisting user data.
-   **Swagger**: Automatically generated API documentation.
-   **Libraries in Use**:
    -   **Winston**: Comprehensive logging.
    -   **dotenv**: Manage environment variables.
    -   **Morgan**: HTTP request logger.
    -   **Helmet**: Adds extra security headers.
    -   **Compression**: Reduces response size.
    -   **body-parser**: Parses incoming request bodies.
    -   **bcrypt**: Secure password hashing.
    -   **express-async-handler**: Simplifies handling async operations.
    -   **express-rate-limit**: Limits request rates to prevent abuse.
    -   **Joi**: Input validation.
    -   **Swagger-jsdoc** & **swagger-ui-express**: Generate and display API documentation.
    -   **nodemon**: Automatic restarts during development.
    -   **Jest** & **Supertest**: For testing and validating endpoints.
    -   **mongodb-memory-server**: In-memory MongoDB for testing without a real database.

## 📑 API Endpoints

This table provides a concise overview of the available endpoints, their respective HTTP methods, descriptions, and expected status codes.

| **Method** | **Endpoint**          | **Description**            | **Status Code** |
| ---------- | --------------------- | -------------------------- | --------------- |
| `GET`      | `/api/users`          | Fetch all registered users | `200 OK`        |
| `POST`     | `/api/users/register` | Register a new user        | `201 Created`   |
| `PUT`      | `/api/users/:id`      | Update user details by ID  | `200 OK`        |
| `DELETE`   | `/api/users/:id`      | Delete a user by ID        | `200 OK`        |

## 📑 API Documentation

Access the complete, interactive API documentation via Swagger at:

```
http://localhost:3000/api-docs
```

## ⚙️ Configuration

Before running the project, set up a `.env` file at the root of the project with the following variables:

```plaintext
PORT=3000
MONGODB_URI=<Your MongoDB URI>
NODE_ENV=<development | production | test>
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Yassinekrn/user-management-service.git
```

2. Navigate to the project directory:

```bash
cd user-management-service
```

3. Install dependencies:

```bash
npm install
```

4. Run the server in development mode:

```bash
npm run devstart
```

The service will be available at `http://localhost:<PORT>`\*.

\*Defaults to 5000 if you do not setup dotenv.

## 🧪 Testing

Testing is an integral part of the service. We use **Jest** for unit and integration tests, with **Supertest** to test the API endpoints.

To run tests:

```bash
npm test
```

### In-Memory Testing with `mongodb-memory-server`

This project uses `mongodb-memory-server` for testing purposes, which spins up an in-memory MongoDB instance. This allows for fast and isolated tests without affecting the production database.

## 🛡 Security

-   **Password Hashing**: All passwords are securely hashed using bcrypt.
-   **Rate Limiting**: Protects against brute-force attacks.
-   **Helmet**: Adds security headers to safeguard against common web vulnerabilities.
-   **Input Validation**: Ensures all incoming data is properly validated using Joi.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Maintained by [Yassine Krichen](https://github.com/Yassinekrn)
