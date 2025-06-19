/**
 * Script Name : app.ts
 * Description : This is the entry point for the app
 * Author      : @tonybnya
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();
connectToDatabase();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);

export default app;
