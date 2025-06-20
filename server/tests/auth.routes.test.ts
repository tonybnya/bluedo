/**
 * Script Name : auth.routes.test.ts
 * Description : This is the test file for the auth routes
 * Author      : @tonybnya
 */

import request from 'supertest';
import app from './test-app.js';
import User from '../src/models/user.model.js';
import { describe, it, expect } from '@jest/globals';

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          password: 'password123'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User registered successfully');
      
      // Verify user was created in the database
      const user = await User.findOne({ username: 'newuser' });
      expect(user).not.toBeNull();
    });

    it('should return 400 if username is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          password: 'password123'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Username and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Username and password are required');
    });

    it('should return 400 if user already exists', async () => {
      // Create a user first
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'existinguser',
          password: 'password123'
        });
      
      // Try to create the same user again
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'existinguser',
          password: 'password123'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'User already exists');
    });

    it('should handle requests with empty body', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({});
      
      expect(response.status).toBe(400);
    });

    it('should handle requests with incorrect content type', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .set('Content-Type', 'text/plain')
        .send('username=newuser&password=password123');
      
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      // Create a user first
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'loginuser',
          password: 'password123'
        });
      
      // Login
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'loginuser',
          password: 'password123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      // Token should be a string with reasonable length for a JWT
      expect(typeof response.body.token).toBe('string');
      expect(response.body.token.length).toBeGreaterThan(20);
    });

    it('should return 401 for invalid credentials', async () => {
      // Create a user first
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'wronguser',
          password: 'password123'
        });
      
      // Try logging in with wrong password
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'wronguser',
          password: 'wrongpassword'
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return 401 for non-existent user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'nonexistentuser',
          password: 'password123'
        });
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should return 400 if username is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password123'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Username and password are required');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'someuser'
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Username and password are required');
    });

    it('should handle empty request body', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Username and password are required');
    });
  });
});

