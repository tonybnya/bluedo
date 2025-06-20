/**
 * Script Name : helpers.ts
 * Description : This is the helper file for the tests
 * Author      : @tonybnya
 */

import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from './test-app.js';
import User from '../src/models/user.model.js';
import mongoose from 'mongoose';

// Generate a valid JWT token for testing
export const generateToken = (userId: string = new mongoose.Types.ObjectId().toString()): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'test-secret-key', { expiresIn: '1d' });
};

// Create a test user and return user object with token 
export const createTestUser = async (username: string = 'tonybnya', password: string = 'tonybny@25') => {
  // Create user
  const user = new User({ username, password });
  await user.save();
  
  // Generate token
  const userId = (user as any)._id.toString();
  const token = generateToken(userId);
  
  return {
    user,
    userId,
    token
  };
};

// Get supertest agent with auth token
export const getAuthenticatedAgent = async () => {
  const { token } = await createTestUser();
  return request(app).set('Authorization', `Bearer ${token}`);
};

// Helper to make authenticated requests
export const authenticatedRequest = (token: string) => {
  return {
    get: (url: string) => request(app).get(url).set('Authorization', `Bearer ${token}`),
    post: (url: string, body?: any) => request(app).post(url).set('Authorization', `Bearer ${token}`).send(body),
    put: (url: string, body?: any) => request(app).put(url).set('Authorization', `Bearer ${token}`).send(body),
    delete: (url: string) => request(app).delete(url).set('Authorization', `Bearer ${token}`)
  };
};

