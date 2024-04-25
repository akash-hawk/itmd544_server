import { ApolloServer } from '@apollo/server';
import { prismaClient } from '../lib/db';
import {User} from './user';
import {Post} from './post';
import {Comment} from './comment';
import UserService from '../services/user';

async function createApolloServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${Comment.typeDefs}
      ${User.typeDefs}
      ${Post.typeDefs}
      type Query {
        ${Comment.queries}
        ${User.queries}
        ${Post.queries}
      }
      type Mutation {
        ${Comment.mutations}
        ${User.mutations}
        ${Post.mutations}
      }
    `,
    resolvers: {
      Post: {
        user: async (post: any) => {
          const user = await UserService.getUserById(post.userId);
          return user;
        }
      },
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
        ...Comment.resolvers.queries
      },
      Mutation: { 
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
        ...Comment.resolvers.mutations,
      }
    }
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloServer;