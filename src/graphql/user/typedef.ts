export const typeDefs = `
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
`