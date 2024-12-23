import userService from '../services/userService.js';
import { NotFoundError } from '../errors/NotFoundError.js';

const userController = {
    createUser: async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const user = await userService.createUser({ name, email, password });
            res.status(201).json({ data: user });
        } catch (error) {
            next(error);
        }
    },
    getUsers: async (req, res, next) => {
        const query = req.query;

        try {
            const users = await userService.findAllUsers(query);
            res.status(200).json({ success: true, data: users });
        } catch (error) {
            next(error);
        }
    },
    getUser: async (req, res, next) => {
        const { id } = req.params;
        try {
            const existingUser = await userService.findUserById(id);
            if (!existingUser) {
                throw new NotFoundError('User not found');
            }
            res.status(200).json({ success: true, data: existingUser });
        } catch (error) {
            next(error);
        }
    },
    updateUser: async (req, res, next) => {
        const { id } = req.params;
        const { name, email, password } = req.body;
        try {
            const existingUser = await userService.findUserById(id);
            if (!existingUser) {
                throw new NotFoundError('User not found');
            }

            const updatedUserData = await userService.updateUserById(id, { name, email, password });
            res.status(200).json({ success: true, data: updatedUserData });
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        const { id } = req.params;
        try {
            const existingUser = await userService.findUserById(id);
            if (!existingUser) {
                throw new NotFoundError('User not found');
            }

            await userService.deleteUserById(id);
            res.status(204).json({ success: true });
        } catch (error) {
            next(error);
        }
    },
};

export default userController;
