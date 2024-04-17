import { ApolloServer } from '@apollo/server';
import { prismaClient } from '../lib/db';
import {User} from './user';

async function createApolloServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
      type Query {
        ${User.queries}
      }
      type Mutation {
        ${User.mutations}
      }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries
      },
      Mutation: { 
        ...User.resolvers.mutations
      }
    }
  });

  await gqlServer.start();
  return gqlServer;
}

export default createApolloServer;



// import { ApolloServer } from '@apollo/server';
// import { prismaClient } from '../lib/db';
// import {User} from './user';
// async function createApolloServer() {
//   const gqlServer = new ApolloServer({
//     typeDefs: `
//       type Query {
//         hello: String
//         say(name: String): String 
//         getUsers: [User]
//       }
//       type Mutation {
//         createUser(
//           firstName: String!, 
//           lastName: String!, 
//           email: String!, 
//           password: String!) : Boolean
//       }
//       type User {
//         id: String!
//         firstName: String!
//         lastName: String
//         email: String
//         password: String
//         profileImage: String
//         salt: String
//       }
//     `,
//     resolvers: {
//       Query: {
//         hello: () => {
//           return "Hola Amigo!";
//         },
//         say: (parent, { name }: { name: String }) => {
//           return `Hello ${name} !`
//         },
//         getUsers: async () => {
//           try {
//             const users = await prismaClient.user.findMany();
//             return users;
//           } catch (error) {
//             console.error('Error fetching users:', error);
//             throw error;
//           }
//         }
//       },
//       Mutation: {
//         createUser: async(parent, {firstName, lastName, email, password} : {
//           firstName: string,
//           lastName: string,
//           email: string,
//           password: string
//         }) => {
//           await prismaClient.user.create({
//             data: {
//               firstName,
//               lastName,
//               email,
//               password,
//               salt: "random_salt"
//             }
//           })
//           return true;
//         }
//       }
//     }
//   });

//   await gqlServer.start();
//   return gqlServer;
// }
