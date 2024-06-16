import express from "express";
import { login, logout,updateProfile, register,UpdateTelf } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/updateProfile/:id",updateProfile)
router.put("/updateTelf", UpdateTelf);
router.post("/logout", logout);

export default router;