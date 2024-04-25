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
const index_1 = __importDefault(require("../../services/comment/index"));
const queries = {
    getCommentsByPostId: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { postId }) {
        try {
            const posts = yield index_1.default.getCommentsById(postId);
            return posts;
        }
        catch (err) {
            console.error("Error fetching posts:", err.message);
            throw new Error(err.message);
        }
    }),
};
const mutations = {
    createComment: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Context", context);
        try {
            const comment = yield index_1.default.createComment(payload, context.user.id);
            return {
                success: true,
                comment
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
