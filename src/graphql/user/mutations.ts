export const mutations = `
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthUserResponse
    changeUserActiveStatus(userId: String!): UpdateUserResponse
    updateUser(userId: String!, firstName: String!, lastName: String!): UpdateUserResponse
    deleteUser(userId: String!): DeletePostResponse
`;