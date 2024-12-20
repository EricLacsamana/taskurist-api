import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware.js';
import userController from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.post('/', authenticateJWT, userController.createUser);

userRoutes.get('/', authenticateJWT, userController.getUsers);

userRoutes.get('/:id', authenticateJWT, userController.getUser);

userRoutes.put('/:id', authenticateJWT, userController.updateUser);

userRoutes.delete('/:id', authenticateJWT, userController.deleteUser);

export default userRoutes;
