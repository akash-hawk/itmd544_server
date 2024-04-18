"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `
    getUsers: [User!]!
    getCurrentUser: User
    getUserById(userId: String!): User
    getUserToken(email: String!, password: String!): LoginUserResponse
`;
