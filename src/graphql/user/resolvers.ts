import UserService, { CreateUserPayload } from "../../services/user/index";

const queries = {
  getUsers: async () => {
    try {
      const users = await UserService.getAllUsers();
      return users; // Just return the array of users directly
    } catch (err: any) {
      console.error("Error fetching users:", err.message);
      throw new Error("Failed to fetch users");
    }
  }
};

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
