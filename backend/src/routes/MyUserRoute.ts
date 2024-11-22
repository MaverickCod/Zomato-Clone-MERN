import express from "express";
import { createCurrentUser, updateCurrentUser } from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";

const router = express.Router();

// /api/my/user 
router.post("/", jwtCheck, createCurrentUser);
router.put("/", jwtCheck, jwtParse, updateCurrentUser)

export default router;