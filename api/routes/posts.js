import express from "express";

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  getPostsByUser,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/:id", addPost);
router.put("/:id", updatePost);
router.delete("/user/:id", deletePost);
router.get("/user/:userId", getPostsByUser);

export default router;