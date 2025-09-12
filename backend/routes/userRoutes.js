import express from "express";
import { getUserProfile, updateUserProfile, getBookmarks } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user profile
router.get("/:username", getUserProfile);
router.put("/update", authMiddleware, updateUserProfile);
router.get("/:id/bookmarks", authMiddleware, getBookmarks);

export default router;
