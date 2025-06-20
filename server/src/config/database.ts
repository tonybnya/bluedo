/**
 * Script Name : database.ts
 * Description : Handle MongoDB connection via the connection string from .env
 * Author      : @tonybnya
 */

import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    // handle the error
    throw error;
  }
};

export { connectToDatabase };
export default connectToDatabase;