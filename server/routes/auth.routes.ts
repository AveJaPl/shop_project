import express from "express";
import {login, register, logout, resetPassword} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);

export default router;