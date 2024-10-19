const Joi = require("joi");

// Define address validation schema
const addressSchema = Joi.object({
    street: Joi.string().optional().allow(""), // Optional field
    city: Joi.string().optional().allow(""),
    state: Joi.string().optional().allow(""),
    postalCode: Joi.string().optional().allow(""),
    country: Joi.string().optional().allow(""),
});

const registerUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required().messages({
        "string.base": "First name must be a string",
        "string.empty": "First name cannot be empty",
        "string.min": "First name must have at least 2 characters",
        "any.required": "First name is required",
    }),
    lastName: Joi.string().min(2).max(30).required().messages({
        "string.base": "Last name must be a string",
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name must have at least 2 characters",
        "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email cannot be empty",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must have at least 8 characters",
        "string.empty": "Password cannot be empty",
        "any.required": "Password is required",
    }),
    membershipStatus: Joi.string()
        .valid("active", "overdue", "suspended")
        .default("active")
        .messages({
            "any.only":
                'Membership status must be one of "active", "overdue", or "suspended"',
        }),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{8,15}$/)
        .optional()
        .allow("")
        .messages({
            "string.pattern.base": "Phone number must be between 8-15 digits",
        }),
    address: addressSchema.optional(),
    dateOfBirth: Joi.date().less("now").optional().messages({
        "date.less": "Date of birth must be in the past",
    }),
    overdueLoans: Joi.number().integer().min(0).default(0),
});

const updateUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).optional().messages({
        "string.base": "First name must be a string",
        "string.min": "First name must have at least 2 characters",
    }),
    lastName: Joi.string().min(2).max(30).optional().messages({
        "string.base": "Last name must be a string",
        "string.min": "Last name must have at least 2 characters",
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "Email must be a valid email",
    }),
    password: Joi.string().min(8).optional().messages({
        "string.min": "Password must have at least 8 characters",
    }),
    membershipStatus: Joi.string()
        .valid("active", "overdue", "suspended")
        .optional()
        .messages({
            "any.only":
                'Membership status must be one of "active", "overdue", or "suspended"',
        }),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{8,15}$/)
        .optional()
        .allow("")
        .messages({
            "string.pattern.base": "Phone number must be between 8-15 digits",
        }),
    address: addressSchema.optional(),
    dateOfBirth: Joi.date().less("now").optional().messages({
        "date.less": "Date of birth must be in the past",
    }),
    overdueLoans: Joi.number().integer().min(0).optional().messages({
        "number.min": "Overdue loans must be at least 0",
    }),
}).min(1);

module.exports = { registerUserSchema, updateUserSchema };
