import { prismaClient } from "../../lib/db";

export interface CreatePostPayload {
  title: string,
  body: string
}

class PostService {

  public static async createPost(payload: CreatePostPayload, userId: string) {
    const { title, body } = payload;
    try {
      const post = await prismaClient.post.create({
        data: {
          title, 
          body,
          userId
        }
      });
      return post.id;
    } catch (error) {
      throw new Error("An error occurred while creating the post");
    }
  }

  public static async getAllPosts() {
    try {
      const posts = await prismaClient.post.findMany();
      return posts;
    } catch (error) {
      throw new Error("An error occurred while fetching the posts");
    }
  }

  public static async getPostByUserId(userId: string) {
    try {
      const posts = await prismaClient.post.findMany(
        {
          where: {
            userId: userId
          }
        }
      );
      return posts;
    } catch (error) {
      throw new Error("An error occurred while fetching the posts");
    }
  }

  public static async getPostById(postId: string) {
    try {
      const post = await prismaClient.post.findUnique({
        where: {
          id: postId
        }
      });
      if (!post) {
        throw new Error("Post not found !");
      }
      return post;
    } catch (error) {
      throw new Error("An error occurred while fetching the post !");
    }
  }

  public static async updatePost(postId: string, data: { title: string, body: string }) {
    try {
      await prismaClient.post.update({
        where: {
          id: postId
        },
        data: {
          title: data.title,
          body: data.body
        }
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public static async deletePost(postId: string) {
    try {
      await prismaClient.post.delete({
        where: {
          id: postId
        }
      });
    } catch (error) {
      throw new Error("An error occurred while updating the post");
    }
  }

}

export default PostService;