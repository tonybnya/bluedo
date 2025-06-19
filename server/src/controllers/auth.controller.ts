/**
 * Script Name : auth.controller.ts
 * Description : This file defines the authentication controller
 * Author      : @tonybnya
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existing = await User.findOne({ username });

  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ username, password });
  await user.save();
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
