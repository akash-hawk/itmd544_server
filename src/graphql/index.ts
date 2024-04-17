import { ApolloServer } from '@apollo/server';
import { prismaClient } from '../lib/db';
import {User} from './user';
import {Post} from './post';

async function createApolloServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      ${Post.typeDefs}
      type Query {
        ${User.queries}
        ${Post.queries}
      }
      type Mutation {
        ${User.mutations}
        ${Post.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries
      },
      Mutation: { 
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
      }
    }
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloServer;