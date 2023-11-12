import express from 'express';
import verifyJWT from '../middleware/verifyJWT';
import { addToCart, deleteFromCart, getCart } from '../controllers/cart.controller';

const router = express.Router();


router.get('/', verifyJWT(), getCart)
router.post('/', verifyJWT(), addToCart)
router.delete('/:id', verifyJWT(), deleteFromCart)

export default router;