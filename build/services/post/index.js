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
const db_1 = require("../../lib/db");
class PostService {
    static createPost(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, body, userId } = payload;
            try {
                const post = yield db_1.prismaClient.post.create({
                    data: {
                        title,
                        body,
                        userId
                    }
                });
                return post.id;
            }
            catch (error) {
                throw new Error("An error occurred while creating the post");
            }
        });
    }
    static getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield db_1.prismaClient.post.findMany();
                return posts;
            }
            catch (error) {
                throw new Error("An error occurred while fetching the posts");
            }
        });
    }
    static getPostById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield db_1.prismaClient.post.findUnique({
                    where: {
                        id: postId
                    }
                });
                if (!post) {
                    throw new Error("Post not found !");
                }
                return post;
            }
            catch (error) {
                throw new Error("An error occurred while fetching the post !");
            }
        });
    }
}
exports.default = PostService;
