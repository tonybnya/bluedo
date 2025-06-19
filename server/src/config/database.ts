/**
 * Script Name : database.ts
 * Description : Handle MongoDB connection via the connection string from .env
 * Author      : @tonybnya
 */

import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to database...");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
}

export { connectToDatabase };
export default connectToDatabase;
