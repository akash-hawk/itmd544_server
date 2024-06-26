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
exports.resolvers = void 0;
const index_1 = __importDefault(require("../../services/user/index"));
const queries = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield index_1.default.getAllUsers();
            return users; // Just return the array of users directly
        }
        catch (err) {
            console.error("Error fetching users:", err.message);
            throw new Error("Failed to fetch users");
        }
    }),
    getUserById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
        try {
            const user = yield index_1.default.getUserById(userId);
            return user;
        }
        catch (err) {
            console.error("Error fetching user:", err.message);
            throw new Error("Failed to fetch user");
        }
    }),
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = yield index_1.default.getUserToken({
                email: payload.email,
                password: payload.password
            });
            let user = yield index_1.default.getUserByEmail(payload.email);
            return {
                token: token,
                user: user,
                message: "",
                success: true
            };
        }
        catch (err) {
            console.log("Inside Catch: " + err);
            return {
                token: "",
                user: null,
                message: err.message,
                success: false
            };
        }
    }),
    getCurrentUser: (_, params, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (context && context.user) {
            const userInfo = yield index_1.default.getUserById(context.user.id);
            return userInfo;
        }
        throw new Error('Unauthorized');
    })
};
const mutations = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield index_1.default.createUser(payload);
            const token = yield index_1.default.getUserToken({
                email: payload.email,
                password: payload.password
            });
            return {
                token: token,
                user: user,
                message: "",
                success: true
            };
        }
        catch (err) {
            console.error("Error creating user:", err.message);
            return {
                token: "",
                user: null,
                message: err.message,
                success: false
            };
        }
    }),
    updateUser: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { userId, firstName, lastName }) {
        try {
            yield index_1.default.updateUser(userId, { firstName, lastName });
            return {
                success: true
            };
        }
        catch (err) {
            console.error("Error updating user:", err.message);
            return {
                success: false,
                message: err.message
            };
        }
    }),
    deleteUser: (_3, _c) => __awaiter(void 0, [_3, _c], void 0, function* (_, { userId }) {
        try {
            yield index_1.default.deleteUser(userId);
            return {
                success: true
            };
        }
        catch (err) {
            console.error('Error deleting user:', err);
            return {
                success: false,
                message: err.message
            };
        }
    }),
    changeUserActiveStatus: (_4, _d) => __awaiter(void 0, [_4, _d], void 0, function* (_, { userId }) {
        try {
            yield index_1.default.changeUserStatus(userId);
            return {
                success: true,
            };
        }
        catch (err) {
            return {
                success: false,
                message: err.message
            };
        }
    })
};
exports.resolvers = {
    queries,
    mutations
};
