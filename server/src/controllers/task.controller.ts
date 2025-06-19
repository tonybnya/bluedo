/**
 * Script Name : task.controller.ts
 * Description : This file defines the task controller
 * Author      : @tonybnya
 */

import { Request, Response } from "express";
import Task from "../models/task.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  const tasks = await Task.find({ userId: req.user?.userId });
  res.json(tasks);
};

export const getTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user?.userId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  const { title, description } = req.body;
  const task = new Task({ title, description, userId: req.user?.userId });
  await task.save();
  res.status(201).json(task);
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  const { title, description } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user?.userId },
    { title, description },
    { new: true },
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user?.userId,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(204).end();
};
