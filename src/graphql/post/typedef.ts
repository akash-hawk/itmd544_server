export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    body: String!
    userId: String!
    user: User!
    createdAt: String
  }
  type CreatePostResponse {
    success: Boolean!
    message: String
    postId: String
  }
  type UpdatePostResponse {
    success: Boolean!
    message: String
  }
  type DeletePostResponse {
    success: Boolean!
    message: String
  }
`