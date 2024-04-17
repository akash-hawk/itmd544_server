export const queries = `
    getUsers: [User!]!
    getUserById(userId: String!): User
    getUserToken(email: String!, password: String!): String
`;
