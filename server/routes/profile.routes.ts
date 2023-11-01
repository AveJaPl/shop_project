import express from 'express';
import { changeEmail, deleteAccount, updateProfile, updateSettings } from '../controllers/profile.controller';

const router = express.Router();

router.post('/change-email', changeEmail);
router.post('/delete-account', deleteAccount);
router.post('/update-profile', updateProfile);
router.post('/update-settings', updateSettings);

export default router;