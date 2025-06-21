#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Installing dependencies..."
npm install

echo "Building TypeScript..."
npx tsc

echo "Listing files in dist directory..."
ls -la dist || echo "dist directory not found or empty"

echo "Build completed successfully"
