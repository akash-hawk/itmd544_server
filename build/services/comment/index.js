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
class CommentService {
    static createComment(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body, postId } = payload;
            try {
                const data = yield db_1.prismaClient.comment.create({
                    data: {
                        body,
                        postId,
                        userId
                    }
                });
                console.log("data" + data);
                return data;
            }
            catch (error) {
                console.log("error" + error.message);
                throw new Error(error.message);
            }
        });
    }
    static getCommentsById(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield db_1.prismaClient.comment.findMany({
                    where: {
                        postId: postId
                    },
                });
                return comments;
            }
            catch (error) {
                throw new Error("An error occurred while fetching the posts");
            }
        });
    }
}
exports.default = CommentService;
