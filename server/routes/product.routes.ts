import express from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/product.controller";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.get("/", getProducts);
router.get("/:productId", getProductById);

router.post("/", addProduct);
router.delete("/:productId", deleteProduct);
router.put("/:productId", updateProduct);


export default router;