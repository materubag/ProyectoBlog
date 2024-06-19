import express from "express";
import { verifyToken, checkIfMod } from "../authMiddleware.js";
import {
  getInvisibleUsers,
  getInvisiblePosts,
  getInvisibleComments,
  getModReq,
  updateVisibleUser,
  updateVisiblePost,
  updateVisibleComment,
  updateMod
} from "../controllers/modder.js";

const router = express.Router();

router.get("/invisible-users", verifyToken, checkIfMod, getInvisibleUsers);
router.get("/invisible-posts", verifyToken, checkIfMod, getInvisiblePosts);
router.get("/invisible-comments",verifyToken, checkIfMod, getInvisibleComments);
router.get("/mod-req", verifyToken, checkIfMod, getModReq);
router.put("/update-visible-user/:id", verifyToken, checkIfMod, updateVisibleUser);
router.put("/update-visible-post/:id", verifyToken, checkIfMod, updateVisiblePost);
router.put("/update-visible-comment/:id", verifyToken, checkIfMod, updateVisibleComment);
router.put("/update-mod/:id", verifyToken, checkIfMod, updateMod);

export default router;
