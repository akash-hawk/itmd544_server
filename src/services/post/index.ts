import { prismaClient } from "../../lib/db";

export interface CreatePostPayload {
  title: string,
  body: string
  userId: string,
  image: string
}

class PostService {

  public static async createPost(payload: CreatePostPayload) {
    const { title, body, userId } = payload;
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

  public static async getAllPosts(){
    try {
      const posts = await prismaClient.post.findMany();
      return posts;
    } catch (error) {
      throw new Error("An error occurred while fetching the posts");
    }
  }
}

export default PostService;