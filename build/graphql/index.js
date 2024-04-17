"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
function createApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
      type Query {
        ${user_1.User.queries}
      }
      type Mutation {
        ${user_1.User.mutations}
      }
      type CreateUserResponse {
        success: Boolean!
        userId: String
        message: String
      }

      type User {
        id: ID
        firstName: String
        lastName: String
        email: String!
        password: String!
        profileImage: String
      }
    `,
            resolvers: {
                Query: Object.assign({}, user_1.User.resolvers.queries),
                Mutation: Object.assign({}, user_1.User.resolvers.mutations)
            }
        });
        yield gqlServer.start();
        return gqlServer;
    });
}
exports.default = createApolloServer;
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
