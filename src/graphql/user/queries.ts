export const queries = `
    getUsers: [User!]!
    getCurrentUser: User
    getUserById(userId: String!): User
    getUserToken(email: String!, password: String!): AuthUserResponse
`;
