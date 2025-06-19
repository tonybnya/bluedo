/**
 * Script Name : database.ts
 * Description : Handle MongoDB connection via the connection string from .env
 * Author      : @tonybnya
 */

import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
