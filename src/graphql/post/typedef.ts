export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    user: User!
    createdAt: String
  }
  type PostResponse {
    success: Boolean!
    message: String
    postId: String
  }
`