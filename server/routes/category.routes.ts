import express from "express";
import { getCategories, getCategoriesAndSubcategories, getCategoryById } from "../controllers/product.controller";
const router = express.Router();

router.get("/", getCategories);
router.get("/categorieswithsubcategories", getCategoriesAndSubcategories);
router.get("/:categoryId", getCategoryById);


export default router;