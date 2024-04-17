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
  },
  getUserById: async (_: any, { userId }: { userId: string }) => {
    try {
      const user = await UserService.getUserById(userId);
      return user;
    } catch (err: any) {
      console.error("Error fetching user:", err.message);
      throw new Error("Failed to fetch user");
    }
  },
  getUserToken: async(_: any, payload: {email: string, password: string}) =>{
    const token = await UserService.getUserToken({ 
      email: payload.email, 
      password: payload.password 
    });
    return token;
  },
  getCurrentUser: async(_: any, params: any, context: any) => {
    console.log("======>", context)
    if(context && context.user) {
      const userInfo = await UserService.getUserById(context.user.id);
      return userInfo;
    }
    throw new Error('Unauthorized');
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
  },
  updateUser: async (_: any, { userId, firstName, lastName }: { userId: string, firstName: string, lastName: string }) => {
    try {
      await UserService.updateUser(userId, { firstName, lastName });
      return {
        success: true
      };
    } catch (err: any) {
      console.error("Error updating user:", err.message);
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
