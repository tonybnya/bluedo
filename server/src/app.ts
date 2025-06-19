/**
 * Script Name : app.ts
 * Description : This is the entry point for the app
 * Author      : @tonybnya
 */

import express from "express";
import cors from "cors";
import connectToDatabase from "./config/database";

const app = express();
connectToDatabase;

app.use(cors());
app.use(express.json());

export default app;
