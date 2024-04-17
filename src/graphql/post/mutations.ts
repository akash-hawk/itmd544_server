export const mutations = `
    createPost(title: String!, body: String!, userId: String!, image: String): CreatePostResponse
    updatePost(postId: String!, title: String!, body: String!): UpdatePostResponse
`;