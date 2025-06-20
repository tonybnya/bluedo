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

// load environment variables
dotenv.config();

// create express app
const app = express();

// connect to database
connectToDatabase()
  .then(() => console.log('Database connection successful'))
  .catch(error => {
    console.error('Database connection failed:', error);
  });

// apply middlewares
app.use(cors());

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// debug middleware to log incoming requests
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`, {
    contentType: req.headers['content-type'],
    hasBody: !!req.body
  });
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
