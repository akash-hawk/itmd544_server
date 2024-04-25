import CommentService, { CreateCommentPayload } from "../../services/comment/index";

type contextType = {
  user: {
    email: string,
    id: string
  }
}

const queries = {
  getCommentsByPostId: async (_: any, {postId} : {postId: string}) => {
    try {
      const posts = await CommentService.getCommentsById(postId);
      return posts;
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
      throw new Error(err.message);
    }
  },
};

const mutations = {
  createComment: async (_: any, payload: CreateCommentPayload, context: contextType) => {
    console.log("Context", context)
    try {
      const comment = await CommentService.createComment(payload, context.user.id);
      return {
        success: true,
        comment
      };
    } catch (err: any) {
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
