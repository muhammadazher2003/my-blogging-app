import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  likePost,
  addComment,
  deletePost,
  getMyPosts,
} from "../controllers/postcontroller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/myposts", authMiddleware, getMyPosts);
router.get("/:id", getPostById);
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, addComment);

export default router;
