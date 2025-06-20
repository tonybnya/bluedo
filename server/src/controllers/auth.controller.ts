/**
 * Script Name : auth.controller.ts
 * Description : This file defines the authentication controller
 * Author      : @tonybnya
 */

import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// get JWT_SECRET from .env file
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  return secret;
};

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  // check if request body exists
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  
  const { username, password } = req.body || {};
  
  // validate required fields
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  try {
    const existing = await User.findOne({ username });

  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = new User({ username, password });
  await user.save();
  res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  // check if request body exists
  if (!req.body) {
    return res.status(400).json({ message: "Request body is missing" });
  }
  
  const { username, password } = req.body || {};
  
  // validate required fields
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  try {
    const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, getJwtSecret(), { expiresIn: "1d" });
  res.json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ message: "Server error during login" });
  }
};
