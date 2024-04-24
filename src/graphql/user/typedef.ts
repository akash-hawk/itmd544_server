export const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    active: Boolean!
    profileImage: String
    userType: String!
  }
  type AuthUserResponse {
    user: User
    token: String!
    success: Boolean!
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