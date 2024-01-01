// Importing necessary modules and configuration
import config from "../config/config";
import { Client, Account, ID } from "appwrite";

// Creating a class for authentication services
export class AuthService {
  // Creating a new Appwrite client and account instance
  client = new Client();
  account;

  // Constructor to set Appwrite endpoint and project ID
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.account = new Account(this.client);
  }

  // Service to create a new user account
  async createAccount({ email, password, name }) {
    try {
      // Creating a user account using Appwrite SDK
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // If account creation is successful, log in the user
      if (userAccount) {
        return this.logIn({ email: email, password: password });
      } else {
        // Return the user account object
        return userAccount;
      }
    } catch (error) {
      // Handling errors and throwing them
      throw new Error(error);
    }
  }

  // Service to log in a user
  async login({ email, password }) {
    try {
      // Creating an email session using Appwrite SDK for user login
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      // Logging errors during login
      console.log("Appwrite service :: login :: error", error);
    }
  }

  // Service to get the current logged-in user
  async getCurrentUser() {
    try {
      // Getting the current user's account details using Appwrite SDK
      return await this.account.get();
    } catch (error) {
      // Logging errors when getting current user
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }

  // Service to log out the current user
  async logout() {
    try {
      // Deleting sessions to log out the user using Appwrite SDK
      await this.account.deleteSessions();
    } catch (error) {
      // Logging errors during logout
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

// Creating an instance(object) of the AuthService class so we can directly use by dot object 
const authService = new AuthService();
export default authService;
