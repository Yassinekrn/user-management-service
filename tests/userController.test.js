const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Your Express app
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../models/userModel");

// Mock bcrypt
jest.mock("bcrypt", () => ({
    hash: jest.fn().mockResolvedValue("hashedPassword"),
}));

let mongoServer;
beforeAll(async () => {
    process.env.NODE_ENV = "test"; // Set environment to test
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await mongoose.connection.dropDatabase(); // Clean up database between tests
});

describe("User Controller", () => {
    describe("GET /api/users", () => {
        it("should return all users", async () => {
            // Insert mock user data
            const user = new User({
                email: "test@example.com",
                firstName: "John",
                lastName: "Doe",
                passwordHash: "hashedPassword",
            });
            await user.save();

            const res = await request(app).get("/api/users");

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].email).toBe("test@example.com");
        });
    });

    describe("POST /api/users/register", () => {
        it("should register a new user", async () => {
            const res = await request(app).post("/api/users/register").send({
                email: "newuser@example.com",
                password: "password123",
                firstName: "Jane",
                lastName: "Doe",
            });

            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toBe("User registered successfully!");

            // Verify user exists in DB
            const user = await User.findOne({ email: "newuser@example.com" });
            expect(user).not.toBeNull();
        });

        it("should return 400 if validation fails", async () => {
            const res = await request(app).post("/api/users/register").send({
                email: "", // Invalid email
                password: "password123",
                firstName: "Jane",
                lastName: "Doe",
            });

            expect(res.statusCode).toEqual(400);
            expect(res.body.error).toBeDefined();
        });
    });
});
