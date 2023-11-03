import express from "express";
import { login, register, logout, resetPassword } from "../controllers/auth.controller";
import cookieParser from "cookie-parser";

const router = express.Router();

router.use(cookieParser());

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);

export default router;