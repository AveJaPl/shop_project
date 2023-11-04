import express from "express";
import { getCategories, getCategoryById } from "../controllers/product.controller";
const router = express.Router();

router.get("/", getCategories);
router.get("/:categoryId", getCategoryById);


export default router;