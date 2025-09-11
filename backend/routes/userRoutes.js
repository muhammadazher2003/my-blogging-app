import express from "express";
import { getUserProfile, updateUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user profile
router.get("/:username", getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);

export default router;
