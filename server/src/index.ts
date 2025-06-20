/**
 * Script Name : index.ts
 * Description : This is the entry point for the server
 * Author      : @tonybnya
 */

import dotenv from "dotenv";
dotenv.config();

// define a self-executing async function to allow top-level await
(async () => {
  try {
    // explicitly log importing app
    const appModule = await import('./app.js');
    const app = appModule.default;
    
    const PORT = process.env.PORT || 5200;
    console.log(`Port configured: ${PORT}`);
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
