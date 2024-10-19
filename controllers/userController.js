const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { registerUserSchema } = require("../validation/userValidation");

exports.registerUser = asyncHandler(async (req, res, next) => {
    const { error } = registerUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, firstName, lastName } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(409).json({
            message: "User with this email already exists",
        });
        return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        email,
        firstName,
        lastName,
        passwordHash,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // If the user has overdue loans or other active connections, you might want to prevent deletion or handle them
    if (user.overdueLoans > 0) {
        return res.status(400).json({
            message: "Cannot delete user with overdue loans",
        });
    }

    // Remove user
    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
    // Validate incoming request data
    const { error } = updateUserSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        address,
        dateOfBirth,
    } = req.body;

    // If the email is being updated, ensure it's unique
    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ message: "Email already in use" });
        }
        user.email = email;
    }

    // Update other fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;

    // If password is being updated, hash it before saving
    if (password) {
        user.passwordHash = await bcrypt.hash(password, 10);
    }

    user.updatedAt = Date.now(); // Update timestamp

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
});
