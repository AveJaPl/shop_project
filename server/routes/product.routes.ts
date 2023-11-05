import express from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct, getBestSellerProducts, getRecommendedProducts } from "../controllers/product.controller";
import verifyJWT from "../middleware/verifyJWT";
import { getNewArrivalProducts } from "../controllers/product.controller";

const router = express.Router();

router.get("/newarrival", getNewArrivalProducts);
router.get("/bestseller", getBestSellerProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/", getProducts);


router.get("/:productId", getProductById);
router.post("/",verifyJWT(true), addProduct);
router.delete("/:productId",verifyJWT(true), deleteProduct);
router.put("/:productId",verifyJWT(true), updateProduct);


export default router;