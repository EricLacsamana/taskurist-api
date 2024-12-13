import bcrypt from 'bcryptjs';
import authService from './service.js';
import userModel from '../users/model.js';
import userService from '../users/service.js';
import User from '../users/model.js';

const authController = {
    register: async (req, res, next) => {
        try {
            const { name, email, username, password } = req.body;

            if (!username || !password) {
                throw new BadRequestError('Username and password are required');
            }

            const existingUser = await userService.findUserByUsername(username);

            if (existingUser) {
                throw new ConflictError('Username already in use');
            }

            const newUser = await userService.createUser({ name, email, username, password });

            const token = authService.generateToken(newUser);

            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                jwt: token,
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const user = userService.findUserByUsername(username);

            if (!user) {
                throw new NotFoundError('Username or password is incorrect');
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                throw new UnauthorizedError('Username or password is incorrect');
            }

            const token = authService.generateToken(user);

            res.status(200).json({
                user: { id: user.id, username: user.username },
                jwt: token,
            });
        } catch (err) {
            next(err);
        }
    },
};

export default authController;
