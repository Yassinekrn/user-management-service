// swaggerUserSchema.js
module.exports = {
    User: {
        type: "object",
        properties: {
            firstName: {
                type: "string",
                example: "John",
            },
            lastName: {
                type: "string",
                example: "Doe",
            },
            email: {
                type: "string",
                example: "john.doe@example.com",
            },
            passwordHash: {
                // Password for registration (not hashed)
                type: "string",
                example: "password123", // For POST, this would be raw
            },
            membershipStatus: {
                type: "string",
                enum: ["active", "overdue", "suspended"],
                example: "active",
            },
            phoneNumber: {
                type: "string",
                example: "123456789",
            },
            address: {
                type: "object",
                properties: {
                    street: { type: "string", example: "123 Main St" },
                    city: { type: "string", example: "Somewhere" },
                    state: { type: "string", example: "CA" },
                    postalCode: { type: "string", example: "90210" },
                    country: { type: "string", example: "USA" },
                },
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                example: "1990-01-01",
            },
            overdueLoans: {
                type: "integer",
                example: 0,
            },
            createdAt: {
                type: "string",
                format: "date-time",
                example: "2024-01-01T00:00:00Z",
            },
            updatedAt: {
                type: "string",
                format: "date-time",
                example: "2024-01-02T00:00:00Z",
            },
        },
    },
    // Schema for registering a new user
    RegisterUser: {
        type: "object",
        required: ["firstName", "lastName", "email", "password"],
        properties: {
            firstName: {
                type: "string",
                example: "John",
            },
            lastName: {
                type: "string",
                example: "Doe",
            },
            email: {
                type: "string",
                example: "john.doe@example.com",
            },
            password: {
                type: "string",
                example: "password123",
            },
        },
    },
    // Schema for updating an existing user
    UpdateUser: {
        type: "object",
        properties: {
            firstName: {
                type: "string",
                example: "John",
            },
            lastName: {
                type: "string",
                example: "Doe",
            },
            email: {
                type: "string",
                example: "john.doe@example.com",
            },
            password: {
                type: "string",
                example: "newpassword123", // Optional for update
            },
            phoneNumber: {
                type: "string",
                example: "987654321",
            },
            address: {
                type: "object",
                properties: {
                    street: { type: "string", example: "456 Side St" },
                    city: { type: "string", example: "Anywhere" },
                    state: { type: "string", example: "NY" },
                    postalCode: { type: "string", example: "10001" },
                    country: { type: "string", example: "USA" },
                },
            },
            dateOfBirth: {
                type: "string",
                format: "date",
                example: "1990-01-01",
            },
            overdueLoans: {
                type: "integer",
                example: 1,
            },
            membershipStatus: {
                type: "string",
                enum: ["active", "overdue", "suspended"],
                example: "overdue",
            },
        },
    },
};
