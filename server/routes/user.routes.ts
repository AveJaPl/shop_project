import express from 'express';
import { getUserData } from '../controllers/user.controller';
import verifyJWT from '../middleware/verifyJWT';
import { logout } from '../controllers/logout.controller';
const router = express.Router();

router.post('/data', verifyJWT, getUserData);
router.post('/logout', verifyJWT, logout);

export default router;