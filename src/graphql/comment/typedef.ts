export const typeDefs = `
  type UserInfo {
    id: String!
    email: String!
  }
  type Comment {
    id: ID!
    postId: String!
    body: String!
    userId: String!
    createdAt: String
  }
  type CreateComment {
    success: Boolean!
    message: String
    comment: Comment
  }
`