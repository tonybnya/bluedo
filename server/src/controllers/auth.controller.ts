/**
 * Script Name : auth.controller.ts
 * Description : This file defines the authentication controller
 * Author      : @tonybnya
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Get JWT_SECRET from environment variables when needed
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });

  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, getJwtSecret(), { expiresIn: "1d" });
  res.json({ token });
};
