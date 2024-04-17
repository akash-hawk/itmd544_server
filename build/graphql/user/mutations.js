"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): CreateUserResponse
    updateUser(userId: String!, firstName: String!, lastName: String!): UpdateUserResponse
`;
