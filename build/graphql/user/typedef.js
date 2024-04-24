"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    active: Boolean!
    profileImage: String
    userType: String!
  }
  type LoginUserResponse {
    user: User
    token: String!
    success: Boolean!
    message: String
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
  type DeletePostResponse {
    success: Boolean!
    message: String
  }
`;
