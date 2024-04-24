export const mutations = `
    createPost(title: String!, body: String!): CreatePostResponse
    updatePost(postId: String!, title: String!, body: String!): UpdatePostResponse
    deletePost(postId: String!): DeletePostResponse
`;