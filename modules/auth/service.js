import jwt from 'jsonwebtoken';

const authService = {
    generateToken: ({ id, username }) => {
        return jwt.sign({ id, username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },
};

export default authService;
