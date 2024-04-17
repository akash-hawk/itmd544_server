"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const db_1 = require("../../lib/db");
class UserService {
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = payload;
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new Error("Invalid email format");
            }
            // Validate name length
            if (firstName.length < 2 || lastName.length < 2) {
                throw new Error("First name and last name must be at least 2 characters long");
            }
            // Validate password strength (Example: minimum length of 8 characters)
            if (password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
            // Generate salt and hash the password
            const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
            const hashedPassword = (0, node_crypto_1.createHmac)('sha256', salt).update(password).digest('hex');
            try {
                // Attempt to create user in the database
                const user = yield db_1.prismaClient.user.create({
                    data: {
                        firstName,
                        lastName,
                        email,
                        salt,
                        password: hashedPassword
                    }
                });
                // Return the created user's ID
                return user.id;
            }
            catch (error) {
                // Handle any database-related errors
                throw new Error("An error occurred while creating the user");
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield db_1.prismaClient.user.findMany();
                return users;
            }
            catch (error) {
                throw new Error("An error occurred while fetching the users");
            }
        });
    }
}
exports.default = UserService;
