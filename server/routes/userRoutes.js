import express from 'express';
import { authUser, registerUser } from '../controllers/userController';

const router = express.Router();

router.post('/auth', authUser);
router.post('/register', registerUser);

export default router;