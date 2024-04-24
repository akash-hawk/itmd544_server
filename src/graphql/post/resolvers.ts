import PostService, { CreatePostPayload } from "../../services/post/index";

type contextType = {
  user: {
    email: string,
    id: string
  }
}

const queries = {
  getPosts: async (_:any, param: any, context: contextType) => {
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
  getPostByUserId: async (_: any, params: any, context: any) => {
    try {
      const posts = await PostService.getPostByUserId(context.user.id);
      return posts;
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
      throw new Error(err.message);
    }
  },
};

const mutations = {
  createPost: async (_: any, payload: CreatePostPayload, context: contextType) => {
    try {
      const postId = await PostService.createPost(payload, context.user.id);
      return {
        success: true,
        postId
      };
    } catch (err: any) {
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
