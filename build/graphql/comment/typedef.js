"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
  type UserInfo {
    id: String!
    email: String!
  }
  type Comment {
    id: ID!
    postId: String!
    body: String!
    userId: String!
    createdAt: String
  }
  type CreateComment {
    success: Boolean!
    message: String
    comment: Comment
  }
`;
