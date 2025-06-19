/**
 * Script Name : index.ts
 * Description : This is the entry point for the server
 * Author      : @tonybnya
 */

import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
