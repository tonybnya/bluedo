/**
 * Script Name : task.routes.ts
 * Description : Definition of task routes
 * Author      : @tonybnya
 */

import express, { Router, Request, Response, NextFunction } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

// Create router
const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate as express.RequestHandler);

// Cast each controller function to RequestHandler to satisfy TypeScript
router.get("/", getTasks as express.RequestHandler);
router.get("/:id", getTask as express.RequestHandler);
router.post("/", createTask as express.RequestHandler);
router.put("/:id", updateTask as express.RequestHandler);
router.delete("/:id", deleteTask as express.RequestHandler);

export default router;
