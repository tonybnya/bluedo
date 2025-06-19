/**
 * Script Name : index.ts
 * Description : This is the entry point for the server
 * Author      : @tonybnya
 */

// Import dotenv first to ensure environment variables are loaded before anything else
import dotenv from "dotenv";
dotenv.config();

// Define a self-executing async function to allow top-level await
(async () => {
  try {
    console.log('Starting server initialization...');
    
    // Explicitly log importing app
    console.log('Importing app module...');
    const appModule = await import('./app.js');
    const app = appModule.default;
    
    const PORT = process.env.PORT || 5200;
    console.log(`Port configured: ${PORT}`);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Fatal error during server initialization:');
    console.error(error);
    process.exit(1);
  }
})();
