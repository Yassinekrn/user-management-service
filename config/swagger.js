const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerUserSchema = require("./swaggerUserSchema"); // Import the user schema

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description: "API documentation for user management",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
        components: {
            schemas: {
                User: swaggerUserSchema.User, // Use the imported User schema
                RegisterUser: swaggerUserSchema.RegisterUser, // Use the imported RegisterUser schema
                UpdateUser: swaggerUserSchema.UpdateUser, // Use the imported UpdateUser schema
            },
        },
    },
    apis: ["./routes/*.js"], // Point to your route files if needed
};

const swaggerSpecs = swaggerJsdoc(options);
module.exports = swaggerSpecs;

module.exports = { swaggerUi, swaggerSpecs };
