"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImage: String
    userType: String
  }
  type CreateUserResponse {
    success: Boolean!
    userId: String
    message: String
  }
  type UpdateUserResponse {
    success: Boolean!
    message: String
  }
`;
