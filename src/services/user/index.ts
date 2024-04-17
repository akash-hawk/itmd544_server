import {createHmac} from "node:crypto";
import { prismaClient } from "../../lib/db";

interface CreateUserPayload {
  firstName: string,
  lastName: string
  email: string,
  password: string
}

class UserService {
  public static createUser(payload: CreateUserPayload) {
    const {firstName, lastName, email, password} = payload;
    return prismaClient.user.create({
      data: {
        firstName, 
        lastName, 
        email, 
        password
      }
    });
  }
}

export default UserService;