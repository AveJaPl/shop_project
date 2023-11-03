import express from "express";
import { login, register, resetPassword } from "../controllers/auth.controller";
import cookieParser from "cookie-parser";

const router = express.Router();

router.use(cookieParser());

router.post("/login", login);
router.post("/register", register);
router.post("/reset-password", resetPassword);

export default router;