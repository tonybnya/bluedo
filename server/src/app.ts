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
dotenv.config();

const app = express();
connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
