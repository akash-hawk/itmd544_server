import { prismaClient } from "../../lib/db";

export interface CreateCommentPayload {
  body: string,
  postId: string
}

class CommentService {

  public static async createComment(payload: CreateCommentPayload, userId: string) {
    const { body, postId } = payload;
    try {
      const data = await prismaClient.comment.create({
        data: {
          body, 
          postId,
          userId
        }
      });
      console.log("data" + data);
      return data;
    } catch (error: any) {
      console.log("error" + error.message);
      throw new Error(error.message);
    }
  }

  public static async getCommentsById(postId: string) {
    try {
      const comments = await prismaClient.comment.findMany(
        {
          where: {
            postId: postId
          },
        }
      );
      return comments;
    } catch (error) {
      throw new Error("An error occurred while fetching the posts");
    }
  }

}

export default CommentService;