import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const userService = {
    createUser: async ({ name, email, username, password }) => {
        const newUser = new User({
            name,
            email,
            username,
            password,
        });

        return newUser.save();
    },
    findUserById: async (id) => {
        const user = await User.findById(id);
        return user;
    },
    findUserByUsername: async (username) => {
        const user = await User.findOne({ username });
        return user;
    },
    findAllUsers: async () => {
        return User.find();
    },
    updateUserById: async (id, payload) => {
        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        }

        return User.findByIdAndUpdate(id, payload, { new: true });
    },
    deleteUserById: async (id) => {
        return User.findByIdAndDelete(id);
    },
};

export default userService;
