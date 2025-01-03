import { Router } from 'express';
import authController from '../controllers/authController.js';
import { authenticateAdmin, validateAccessToken } from '../middleware/authMiddleware.js';

const authRoutes = Router();

authRoutes.post('/send-invite', authController.sendInvite);

authRoutes.post('/verify-invite', validateAccessToken, authController.verifyInvite);

authRoutes.post('/register-with-invite', authController.register);

authRoutes.post('/register', authController.register);

authRoutes.post('/login', authController.login);

export default authRoutes;
