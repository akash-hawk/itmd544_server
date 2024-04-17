import UserService, { CreateUserPayload } from "../../services/user/index";

const queries = {};

const mutations = {
  createUser: async (_: any, payload: CreateUserPayload) => {
    try {
      const userId = await UserService.createUser(payload);
      return {
        success: true,
        userId
      };
    } catch (err: any) {
      console.error("Error creating user:", err.message);
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
