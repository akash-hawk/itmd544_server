import UserService, {CreateUserPayload} from "../../services/user/index";

const queries = {
  
};

const mutations = {
  createUser: async(_: any, payload: CreateUserPayload) => {
    try {
      const res = await UserService.createUser(payload);
      return res.id; 
    } catch(err) {
      console.error(err)
      return "";
    }
  }
};

export const resolvers = {
  queries,
  mutations
};