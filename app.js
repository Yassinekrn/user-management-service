const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const limiter = require("./middleware/limiter");

const compression = require("compression");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/userRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const { swaggerUi, swaggerSpecs } = require("./config/swagger");

const app = express();

// Middlewares
app.use(limiter);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Catch 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

module.exports = app;
