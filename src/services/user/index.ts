import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../../lib/db";
import jwt from "jsonwebtoken";

const SECRET_KEY = "ITMD-544";

export interface CreateUserPayload {
  firstName: string,
  lastName: string
  email: string,
  password: string
}

export interface GetUserTokenPayload {
  email: string,
  password: string
}

class UserService {

  private static generateHash(salt: string, password: string) {
    return createHmac('sha256', salt).update(password).digest('hex');;
  }

  public static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({where: {email}});
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const {email, password} = payload;
    const user = await UserService.getUserByEmail(email);
    if(!user) throw new Error("User not found !");
    // user exists
    const hashedPassword = UserService.generateHash(user.salt, password);
    if(hashedPassword !== user.password) throw new Error("Incorrect Password !");
    // valid user - generate token
    const token = jwt.sign({
      id: user.id,
      email: user.email
    }, SECRET_KEY);
    return token;
  }

  public static async decodeJWTToken(token: string) {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  public static async createUser(payload: CreateUserPayload) {
    const { firstName, lastName, email, password } = payload;

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Validate name length
    if (firstName.length < 2 || lastName.length < 2) {
      throw new Error("First name and last name must be at least 2 characters long");
    }

    // Validate password strength (Example: minimum length of 8 characters)
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    // Generate salt and hash the password
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = UserService.generateHash(salt, password)

    try {
      // Attempt to create user in the database
      const user = await prismaClient.user.create({
        data: {
          firstName,
          lastName,
          email,
          salt,
          password: hashedPassword
        }
      });

      // Return the created user's ID
      return user.id;
    } catch (error) {
      // Handle any database-related errors
      throw new Error("An error occurred while creating the user");
    }
  }

  public static async getAllUsers(){
    try {
      const users = await prismaClient.user.findMany();
      return users;
    } catch (error) {
      throw new Error("An error occurred while fetching the users");
    }
  }

  public static async getUserById(userId: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId
        }
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("An error occurred while fetching the user");
    }
  }

  public static async updateUser(userId: string, data: { firstName: string, lastName: string }) {
    try {
      await prismaClient.user.update({
        where: {
          id: userId
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      });
    } catch (error) {
      throw new Error("An error occurred while updating the user");
    }
  }

  public static async changeUserStatus(userId: string) {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: userId
        }
      });
      if(user && user.id) {
        await prismaClient.user.update({
          where: {
            id: userId
          },
          data: {
            active: user.active,
          }
        });
      } else {
        throw new Error("User Unauthorised!");
      }
    } catch (error) {
      throw new Error("An error occurred while updating the user");
    }
  }

  public static async deleteUser(userId: string) {
    try {
      await prismaClient.user.delete({
        where: {
          id: userId
        }
      });
    } catch (error) {
      throw new Error("An error occurred while updating the post");
    }
  }
}

export default UserService;
