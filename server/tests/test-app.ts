/**
 * Script Name : test-app.ts
 * Description : Special version of app.ts for testing that doesn't connect to the database
 * Author      : @tonybnya
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/auth.routes.js";
import taskRoutes from "../src/routes/task.routes.js";

// load environment variables
dotenv.config();

const app = express();

// apply middlewares
app.use(cors());

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// debug middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, {
    contentType: req.headers['content-type'],
    hasBody: !!req.body
  });
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;

