/**
 * Script Name : task.routes.test.ts
 * Description : This is the test file for the task routes
 * Author      : @tonybnya
 */

import request from 'supertest';
import mongoose from 'mongoose';
import app from './test-app.js';
import Task from '../src/models/task.model.js';
import { describe, it, expect, beforeEach } from '@jest/globals';
import { createTestUser, authenticatedRequest } from './helpers.js';

describe('Task Routes', () => {
  let token: string;
  let userId: string;

  beforeEach(async () => {
    // Create a test user and get token for authentication
    const testUser = await createTestUser('taskuser', 'password123');
    token = testUser.token;
    userId = testUser.userId;
  });

  describe('GET /api/tasks', () => {
    it('should return empty array when no tasks exist', async () => {
      const response = await authenticatedRequest(token).get('/api/tasks');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(0);
    });

    it('should return all tasks for the authenticated user', async () => {
      // Create some tasks for the user
      await Task.create([
        { title: 'Task 1', description: 'Description 1', userId },
        { title: 'Task 2', description: 'Description 2', userId }
      ]);
      
      // Create a task for another user (should not be returned)
      const anotherUserId = new mongoose.Types.ObjectId().toString();
      await Task.create({ title: 'Another user task', description: 'Not mine', userId: anotherUserId });
      
      const response = await authenticatedRequest(token).get('/api/tasks');
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
      
      // Verify task properties
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('userId', userId);
      
      // Make sure we only get our own tasks
      const titles = response.body.map((task: any) => task.title);
      expect(titles).toContain('Task 1');
      expect(titles).toContain('Task 2');
      expect(titles).not.toContain('Another user task');
    });

    it('should return 401 if not authenticated', async () => {
      const response = await request(app).get('/api/tasks');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'No token provided');
    });

    it('should return 401 if token is invalid', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .set('Authorization', 'Bearer invalidtoken');
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });
  });

  describe('GET /api/tasks/:id', () => {
    it('should return a specific task by ID', async () => {
      // Create a task
      const task = await Task.create({
        title: 'Test Task',
        description: 'Test Description',
        userId
      });
      
      const response = await authenticatedRequest(token).get(`/api/tasks/${task._id}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Test Task');
      expect(response.body).toHaveProperty('description', 'Test Description');
      expect(response.body).toHaveProperty('userId', userId);
    });
    
    it('should return 404 if task does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const response = await authenticatedRequest(token).get(`/api/tasks/${nonExistentId}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
    });
    
    it('should return 400 if ID format is invalid', async () => {
      const response = await authenticatedRequest(token).get('/api/tasks/invalidid');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid task ID format');
    });
    
    it('should not allow access to another user\'s task', async () => {
      // Create a task for another user
      const anotherUserId = new mongoose.Types.ObjectId().toString();
      const task = await Task.create({
        title: 'Another User Task',
        description: 'Not mine',
        userId: anotherUserId
      });
      
      const response = await authenticatedRequest(token).get(`/api/tasks/${task._id}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'This is a new task'
      };
      
      const response = await authenticatedRequest(token).post('/api/tasks').send(taskData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'New Task');
      expect(response.body).toHaveProperty('description', 'This is a new task');
      expect(response.body).toHaveProperty('userId', userId);
      
      // Verify task was actually created in the database
      const taskInDb = await Task.findById(response.body._id);
      expect(taskInDb).not.toBeNull();
      expect((taskInDb as any).title).toBe('New Task');
    });
    
    it('should create a task with just a title', async () => {
      const taskData = {
        title: 'Task with only title'
      };
      
      const response = await authenticatedRequest(token).post('/api/tasks').send(taskData);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Task with only title');
      expect(response.body.description).toBeFalsy(); // Description should be falsy (null, undefined, or empty)
    });
    
    it('should return 400 if title is missing', async () => {
      const taskData = {
        description: 'Missing title'
      };
      
      const response = await authenticatedRequest(token).post('/api/tasks').send(taskData);
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Task title is required');
    });
    
    it('should return 401 if not authenticated', async () => {
      const taskData = {
        title: 'Unauthenticated Task'
      };
      
      const response = await request(app).post('/api/tasks').send(taskData);
      
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'No token provided');
      
      // Verify task was not created
      const tasks = await Task.find({ title: 'Unauthenticated Task' });
      expect(tasks.length).toBe(0);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      // Create a task first
      const task = await Task.create({
        title: 'Original Title',
        description: 'Original Description',
        userId
      });
      
      const updateData = {
        title: 'Updated Title',
        description: 'Updated Description'
      };
      
      const response = await authenticatedRequest(token)
        .put(`/api/tasks/${task._id}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated Title');
      expect(response.body).toHaveProperty('description', 'Updated Description');
      expect(response.body).toHaveProperty('userId', userId);
      
      // Verify task was actually updated in the database
      const updatedTask = await Task.findById(task._id);
      expect((updatedTask as any).title).toBe('Updated Title');
      expect((updatedTask as any).description).toBe('Updated Description');
    });
    
    it('should update just the title if only title is provided', async () => {
      // Create a task first
      const task = await Task.create({
        title: 'Original Title',
        description: 'Original Description',
        userId
      });
      
      const updateData = {
        title: 'Updated Title Only'
      };
      
      const response = await authenticatedRequest(token)
        .put(`/api/tasks/${task._id}`)
        .send(updateData);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Updated Title Only');
      expect(response.body).toHaveProperty('description', 'Original Description'); // Description should remain unchanged
    });
    
    it('should return 404 if task does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      
      const response = await authenticatedRequest(token)
        .put(`/api/tasks/${nonExistentId}`)
        .send({ title: 'Updated Title' });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
    });
    
    it('should return 400 if ID format is invalid', async () => {
      const response = await authenticatedRequest(token)
        .put('/api/tasks/invalidid')
        .send({ title: 'Updated Title' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid task ID format');
    });
    
    it('should not allow updating another user\'s task', async () => {
      // Create a task for another user
      const anotherUserId = new mongoose.Types.ObjectId().toString();
      const task = await Task.create({
        title: 'Another User Task',
        description: 'Not mine',
        userId: anotherUserId
      });
      
      const response = await authenticatedRequest(token)
        .put(`/api/tasks/${task._id}`)
        .send({ title: 'Trying to update' });
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
      
      // Verify task was NOT updated
      const unchangedTask = await Task.findById(task._id);
      expect((unchangedTask as any).title).toBe('Another User Task');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      // Create a task first
      const task = await Task.create({
        title: 'Task to Delete',
        description: 'This task will be deleted',
        userId
      });
      
      const response = await authenticatedRequest(token).delete(`/api/tasks/${task._id}`);
      
      expect(response.status).toBe(204); // No content
      
      // Verify task was actually deleted from the database
      const deletedTask = await Task.findById(task._id);
      expect(deletedTask).toBeNull();
    });
    
    it('should return 404 if task does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      
      const response = await authenticatedRequest(token).delete(`/api/tasks/${nonExistentId}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
    });
    
    it('should return 400 if ID format is invalid', async () => {
      const response = await authenticatedRequest(token).delete('/api/tasks/invalidid');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid task ID format');
    });
    
    it('should not allow deleting another user\'s task', async () => {
      // Create a task for another user
      const anotherUserId = new mongoose.Types.ObjectId().toString();
      const task = await Task.create({
        title: 'Another User Task to Not Delete',
        description: 'Should not be deleted',
        userId: anotherUserId
      });
      
      const response = await authenticatedRequest(token).delete(`/api/tasks/${task._id}`);
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Task not found');
      
      // Verify task was NOT deleted
      const stillExistsTask = await Task.findById(task._id);
      expect(stillExistsTask).not.toBeNull();
    });
  });
});

