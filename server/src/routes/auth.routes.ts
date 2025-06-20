/**
 * Script Name : auth.routes.ts
 * Description : Definition of auth routes
 * Author      : @tonybnya
 */

import express, { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const router = Router();

// cast controller functions to RequestHandler to satisfy TypeScript
router.post("/register", register as express.RequestHandler);
router.post("/login", login as express.RequestHandler);

export default router;
