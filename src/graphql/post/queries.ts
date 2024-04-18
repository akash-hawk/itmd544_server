export const queries = `
    getPosts: [Post!]!
    getPostById(postId: String!): Post
    getPostByUserId(userId: String!): [Post!]!
`;
