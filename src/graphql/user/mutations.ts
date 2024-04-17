export const mutations = `
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): CreateUserResponse
    updateUser(userId: String!, firstName: String!, lastName: String!): UpdateUserResponse
`;