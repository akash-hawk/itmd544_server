"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    createPost(title: String!, body: String!, userId: String!, image: String): CreatePostResponse
    updatePost(postId: String!, title: String!, body: String!): UpdatePostResponse
`;
