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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const db_1 = require("../../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "ITMD-544";
class UserService {
    static generateHash(salt, password) {
        return (0, node_crypto_1.createHmac)('sha256', salt).update(password).digest('hex');
        ;
    }
    static getUserByEmail(email) {
        return db_1.prismaClient.user.findUnique({ where: { email } });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.getUserByEmail(email);
            if (!user)
                throw new Error("User not found @!!!");
            // user exists
            const hashedPassword = UserService.generateHash(user.salt, password);
            if (hashedPassword !== user.password)
                throw new Error("Incorrect Password !");
            // valid user - generate token
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email
            }, SECRET_KEY);
            return token;
        });
    }
    static decodeJWTToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jsonwebtoken_1.default.verify(token, SECRET_KEY);
            }
            catch (error) {
                throw new Error("Invalid token");
            }
        });
    }
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
            const hashedPassword = UserService.generateHash(salt, password);
            try {
                // Check if user already exists
                const existingUser = yield db_1.prismaClient.user.findUnique({
                    where: {
                        email: email,
                    },
                });
                if (existingUser) {
                    throw new Error("User with this email already exists");
                }
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
                return user;
            }
            catch (error) {
                throw new Error(error.message);
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
    static getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.prismaClient.user.findUnique({
                    where: {
                        id: userId
                    }
                });
                if (!user) {
                    throw new Error("User not found");
                }
                return user;
            }
            catch (error) {
                throw new Error("An error occurred while fetching the user");
            }
        });
    }
    static updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.prismaClient.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName
                    }
                });
            }
            catch (error) {
                throw new Error("An error occurred while updating the user");
            }
        });
    }
    static changeUserStatus(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield db_1.prismaClient.user.findUnique({
                    where: {
                        id: userId
                    }
                });
                if (user && user.id) {
                    yield db_1.prismaClient.user.update({
                        where: {
                            id: userId
                        },
                        data: {
                            active: user.active,
                        }
                    });
                }
                else {
                    throw new Error("User Unauthorised!");
                }
            }
            catch (error) {
                throw new Error("An error occurred while updating the user");
            }
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.prismaClient.user.delete({
                    where: {
                        id: userId
                    }
                });
            }
            catch (error) {
                throw new Error("An error occurred while updating the post");
            }
        });
    }
}
exports.default = UserService;
