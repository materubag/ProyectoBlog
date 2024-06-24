import express from "express";
import { checkIfMod } from "../authMiddleware.js";
import {
  getInvisibleUsers,
  getInvisiblePosts,
  getInvisibleComments,
  getModReq,
  updateVisibleUser,
  updateVisiblePost,
  updateVisibleComment,
  updateMod,
  refuseMod,
  deletePost,
  deleteComment
} from "../controllers/modder.js";

const router = express.Router();

router.get("/invisible-users/:id",  checkIfMod, getInvisibleUsers);
router.get("/invisible-posts/:id", checkIfMod, getInvisiblePosts);
router.get("/invisible-comments/:id",  checkIfMod, getInvisibleComments);
router.get("/mod-req/:id",   getModReq);
router.put("/update-visible-user/:id",  checkIfMod, updateVisibleUser);
router.put("/update-visible-post/:id",  checkIfMod, updateVisiblePost);
router.put("/update-visible-comment/:id",  checkIfMod, updateVisibleComment);
router.put("/update-mod/:id",  checkIfMod, updateMod);
router.put("/refuse-mod/:id",  checkIfMod, refuseMod);
router.delete("/:id", checkIfMod,deletePost);
router.delete('/comment/:id', checkIfMod,deleteComment); 

export default router;