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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const user_1 = require("./user");
const post_1 = require("./post");
const comment_1 = require("./comment");
const user_2 = __importDefault(require("../services/user"));
function createApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const gqlServer = new server_1.ApolloServer({
            typeDefs: `
      ${comment_1.Comment.typeDefs}
      ${user_1.User.typeDefs}
      ${post_1.Post.typeDefs}
      type Query {
        ${comment_1.Comment.queries}
        ${user_1.User.queries}
        ${post_1.Post.queries}
      }
      type Mutation {
        ${comment_1.Comment.mutations}
        ${user_1.User.mutations}
        ${post_1.Post.mutations}
      }
    `,
            resolvers: {
                Post: {
                    user: (post) => __awaiter(this, void 0, void 0, function* () {
                        const user = yield user_2.default.getUserById(post.userId);
                        return user;
                    })
                },
                Query: Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.queries), post_1.Post.resolvers.queries), comment_1.Comment.resolvers.queries),
                Mutation: Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.mutations), post_1.Post.resolvers.mutations), comment_1.Comment.resolvers.mutations)
            }
        });
        yield gqlServer.start();
        return gqlServer;
    });
}
exports.default = createApolloServer;
