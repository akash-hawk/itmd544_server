import { createHmac, randomBytes } from "node:crypto";
import { prismaClient } from "../../lib/db";

export interface CreateUserPayload {
  firstName: string,
  lastName: string
  email: string,
  password: string
}

class UserService {
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
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

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
      console.error("Error creating user:", error);
      throw new Error("An error occurred while creating the user");
    }
  }
}

export default UserService;
