import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/error-middleware.js';
import authRoutes from './modules/auth/routes.js';
import userRoutes from './modules/users/routes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;