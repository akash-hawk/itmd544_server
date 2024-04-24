"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthUserResponse
    changeUserActiveStatus(userId: String!): UpdateUserResponse
    updateUser(userId: String!, firstName: String!, lastName: String!): UpdateUserResponse
    deleteUser(userId: String!): DeletePostResponse
`;
