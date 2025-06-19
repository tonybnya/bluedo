/**
 * Script Name : app.ts
 * Description : This is the entry point for the app
 * Author      : @tonybnya
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Load environment variables
console.log('Loading environment variables in app.ts...');
dotenv.config();

console.log('Creating Express app...');
const app = express();

console.log('Connecting to database...');
// Initialize database connection (will be awaited when the promise resolves)
connectToDatabase()
  .then(() => console.log('Database connection successful'))
  .catch(error => {
    console.error('Database connection failed:', error);
    // Not throwing here as this is in a promise chain
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
