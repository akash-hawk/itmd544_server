import PostService, { CreatePostPayload } from "../../services/post/index";
import UserService from "../../services/user";

const queries = {
  getPosts: async () => {
    try {
      const posts = await PostService.getAllPosts();
      return posts;
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
      throw new Error("Failed to fetch posts");
    }
  }
};

const mutations = {
  createPost: async (_: any, payload: CreatePostPayload) => {
    try {
      const postId = await PostService.createPost(payload);
      return {
        success: true,
        postId
      };
    } catch (err: any) {
      console.error("Error creating post:", err.message);
      return {
        success: false,
        message: err.message
      };
    }
  }
};

export const resolvers = {
  queries,
  mutations
};
