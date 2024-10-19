const express = require("express");
const dotenv = require("dotenv");
const logger = require("./utils/logger");
const morgan = require("morgan");
const helmet = require("helmet");

const compression = require("compression");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpecs } = require("./config/swagger");

dotenv.config();
connectDB();

const app = express();

app.use(compression()); // Use compression to compress HTTP responses
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(morgan("dev")); // Log HTTP requests in development mode
app.use(helmet());
// swaggerSetup(app);

// User routes
app.use("/api/users", userRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Catch 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

// Global error handlers for uncaught exceptions and unhandled promise rejections
process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`, err);
    process.exit(1); // Exit on unhandled promise rejection
});

process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.message}`, err);
    process.exit(1); // Exit on uncaught exception
});
