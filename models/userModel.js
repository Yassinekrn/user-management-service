const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    membershipStatus: {
        type: String,
        enum: ["active", "overdue", "suspended"],
        default: "active",
        required: true,
    },
    phoneNumber: { type: String },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
    },
    dateOfBirth: { type: Date },
    overdueLoans: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
