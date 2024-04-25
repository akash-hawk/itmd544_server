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
const index_1 = __importDefault(require("../../services/post/index"));
const queries = {
    getPosts: (_, param, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield index_1.default.getAllPosts();
            return posts;
        }
        catch (err) {
            console.error("Error fetching posts:", err.message);
            throw new Error("Failed to fetch posts");
        }
    }),
    getPostById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { postId }) {
        try {
            const post = yield index_1.default.getPostById(postId);
            return post;
        }
        catch (err) {
            console.error("Error fetching post:", err.message);
            throw new Error("Failed to fetch post");
        }
    }),
    getPostByUserId: (_, params, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const posts = yield index_1.default.getPostByUserId(context.user.id);
            return posts;
        }
        catch (err) {
            console.error("Error fetching posts:", err.message);
            throw new Error(err.message);
        }
    }),
};
const mutations = {
    createPost: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const postId = yield index_1.default.createPost(payload, context.user.id);
            return {
                success: true,
                postId
            };
        }
        catch (err) {
            return {
                success: false,
                message: err.message
            };
        }
    }),
    updatePost: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { postId, title, body }) {
        try {
            yield index_1.default.updatePost(postId, { title, body });
            return {
                success: true,
                postId
            };
        }
        catch (err) {
            return {
                success: false,
                message: err.message
            };
        }
    }),
    deletePost: (_3, _c) => __awaiter(void 0, [_3, _c], void 0, function* (_, { postId }) {
        try {
            yield index_1.default.deletePost(postId);
            return {
                success: true
            };
        }
        catch (err) {
            console.error('Error deleting post:', err);
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
