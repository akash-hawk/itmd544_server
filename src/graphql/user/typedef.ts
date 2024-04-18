export const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImage: String
    userType: String
  }
  type LoginUserResponse {
    userId: String!
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
`