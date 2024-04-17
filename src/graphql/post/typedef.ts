export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    user: User
    createdAt: String
  }
  type CreatePostResponse {
    success: Boolean!
    userId: String
    message: String
  }
`