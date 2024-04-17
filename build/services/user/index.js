"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../lib/db");
class UserService {
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password
            }
        });
    }
}
exports.default = UserService;
