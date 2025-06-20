/**
 * Script Name : setup.ts
 * Description : This is the setup file for the tests
 * Author      : @tonybnya
 */

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

// get environment variables
process.env.JWT_SECRET = 'test-secret-key';
// increase timeout globally
jest.setTimeout(30000);

let mongoServer: MongoMemoryServer;

// Setup before all tests
beforeAll(async () => {
  dotenv.config();
  
  // Start MongoDB Memory Server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect Mongoose to the Memory Server
  await mongoose.connect(mongoUri);
  
  console.log(`MongoDB Memory Server started at ${mongoUri}`);
});

// Cleanup after all tests
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('MongoDB Memory Server stopped');
});

// Clear all collections after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

