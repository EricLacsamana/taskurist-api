import jwt from 'jsonwebtoken';

const authService = {
    generateAccessToken: (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        });
    },
};

export default authService;
