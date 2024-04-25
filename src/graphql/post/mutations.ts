export const mutations = `
    createPost(title: String!, body: String!): PostResponse
    updatePost(postId: String!, title: String!, body: String!): PostResponse
    deletePost(postId: String!): PostResponse
`;