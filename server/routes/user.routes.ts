import express from 'express';
import { getUserData } from '../controllers/user.controller';
import verifyJWT from '../middleware/verifyJWT';
const router = express.Router();

router.post('/data', verifyJWT, getUserData);

export default router;