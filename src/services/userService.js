import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const userService = {
    createUser: async ({ name, email, password }) => {
        const newUser = new User({
            name,
            email,
            password,
        });

        return newUser.save();
    },
    findUserById: async (id) => {
        const user = await User.findById(id).select('-password');
        return user;
    },  
    findUserByEmail: async (email) => {
        const user = await User.findOne({ email });
        return user;
    },
    findAllUsers: async (query) => {
        return User.find(query);
    },
    updateUserById: async (id, payload) => {
        if (payload.password) {
            payload.password = await bcrypt.hash(payload.password, 10);
        } else {
            delete payload.password;
        }

        return User.findByIdAndUpdate(id, payload, { new: true });
    },
    deleteUserById: async (id) => {
        return User.findByIdAndDelete(id);
    },
};

export default userService;
