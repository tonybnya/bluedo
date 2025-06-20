/**
 * Script Name : task.controller.ts
 * Description : This file defines the task controller
 * Author      : @tonybnya
 */

import { Response } from "express";
import Task from "../models/task.model.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
import mongoose from "mongoose";

export const getTasks = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const tasks = await Task.find({ userId: req.user?.userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error in getTasks:', error);
    return res.status(500).json({ message: "Server error while fetching tasks" });
  }
};

export const getTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  // validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID format" });
  }
  
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error('Error in getTask:', error);
    return res.status(500).json({ message: "Server error while fetching task" });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  try {
    const { title, description } = req.body;
    
    // validate required fields
    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }
    
    const task = new Task({ title, description, userId: req.user?.userId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error in createTask:', error);
    return res.status(500).json({ message: "Server error while creating task" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  // validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID format" });
  }
  
  const { title, description } = req.body;
  
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      { title, description },
      { new: true },
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error('Error in updateTask:', error);
    return res.status(500).json({ message: "Server error while updating task" });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response): Promise<Response | void> => {
  // validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid task ID format" });
  }
  
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error in deleteTask:', error);
    return res.status(500).json({ message: "Server error while deleting task" });
  }
};
