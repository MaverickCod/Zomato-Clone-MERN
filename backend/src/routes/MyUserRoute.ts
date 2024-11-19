import express from "express";
import { createCurrentUser } from "../controllers/MyUserController";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

// /api/my/user 
router.post("/", jwtCheck, createCurrentUser);


export default router;