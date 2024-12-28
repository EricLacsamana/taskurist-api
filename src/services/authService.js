import jwt from 'jsonwebtoken';

const authService = {
    generateToken: ({ id, email }) => {
        return jwt.sign({ id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },
    generateAccessToken: (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        });
    },
};

export default authService;
