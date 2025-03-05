// Importing necessary modules and configuration
import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";

// Creating a class for database configuration and operations
export class DatabaseConfig {
  // Creating a new Appwrite client, database, and bucket instance
  client = new Client();
  database;
  bucket;

  // Constructor to set Appwrite endpoint and project ID, and initialize database and bucket instances
  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl)
      .setProject(config.appWriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Service to create a new blog post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      // Creating a document in the specified collection with post details
      return await this.database.createDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      // Logging errors during post creation
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // Service to update a blog post using its slug as an identifier
  async updatePost({ title, slug, content, featuredImage, status }) {
    try {
      // Updating the document in the specified collection with new post details
      return await this.database.updateDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      // Logging errors during post update
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  // Service to delete a blog post using its slug as an identifier
  async deletePost(slug) {
    try {
      // Deleting the document from the specified collection
      await this.database.deleteDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      // Logging errors during post deletion
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // Service to retrieve a blog post using its slug as an identifier
  async getPost(slug) {
    try {
      // Getting the document from the specified collection
      return await this.database.getDocument(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        slug
      );
    } catch (error) {
      // Logging errors during post retrieval
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  // Service to get all blog posts with a specified status (default: active)
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      // Listing documents from the specified collection with optional queries
      return await this.database.listDocuments(
        config.appWriteDatabaseId,
        config.appWriteCollectionId,
        queries
      );
    } catch (error) {
      // Logging errors during post listing
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }

  // Service to upload a file to the Appwrite storage bucket
  async uploadFile(file) {
    try {
      // Creating a new file in the specified bucket with a unique ID
      return await this.bucket.createFile(
        config.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      // Logging errors during file upload
      console.log("Appwrite service :: uploadFile :: error", error);
      return false;
    }
  }

  // Service to delete a file from the Appwrite storage bucket
  async deleteFile(fileId) {
    try {
      // Deleting a file from the specified bucket using its ID
      await this.bucket.deleteFile(config.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      // Logging errors during file deletion
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // Service to retrieve a preview of a file from the Appwrite storage bucket
  async previewFile(fileId) {
    return await this.bucket.getFilePreview(
      config.appWriteBucketId,
      fileId
    );
  }
}

// Creating an instance of the DatabaseConfig class
const service = new DatabaseConfig();

export default service;
