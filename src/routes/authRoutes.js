import { Router } from 'express';
import authController from '../controllers/authController.js';
import { authenticateAdmin } from '../middleware/auth-middleware.js';

const authRoutes = Router();

authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.post('/send-invite', authenticateAdmin, authController.sendInvite);

export default authRoutes;
