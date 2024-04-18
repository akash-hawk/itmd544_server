import PostService, { CreatePostPayload } from "../../services/post/index";

const queries = {
  getPosts: async () => {
    try {
      const posts = await PostService.getAllPosts();
      return posts;
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
      throw new Error("Failed to fetch posts");
    }
  },
  getPostById: async (_: any, { postId }: { postId: string }) => {
    try {
      const post = await PostService.getPostById(postId);
      return post;
    } catch (err: any) {
      console.error("Error fetching post:", err.message);
      throw new Error("Failed to fetch post");
    }
  },
  getPostByUserId: async (_: any, { userId }: { userId: string }) => {
    try {
      const posts = await PostService.getPostByUserId(userId);
      return posts;
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
      throw new Error(err.message);
    }
  },
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
  },
  updatePost: async (_: any, { postId, title, body }: { postId: string, title: string, body: string }) => {
    try {
      await PostService.updatePost(postId, { title, body });
      return {
        success: true
      };
    } catch (err: any) {
      console.error("Error updating post:", err.message);
      return {
        success: false,
        message: err.message
      };
    }
  },
  deletePost: async (_: any, { postId }: {postId: string}) => {
    try {
      await PostService.deletePost(postId);
      return {
        success: true
      };
    } catch (err: any) {
      console.error('Error deleting post:', err);
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
