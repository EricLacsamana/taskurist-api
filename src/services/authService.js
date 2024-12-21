import jwt from 'jsonwebtoken';

const authService = {
    generateToken: ({ id, email }) => {
        return jwt.sign({ id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },
    generateInviteToken: (personId) => {
        const payload = { personId };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
        return token;
    },
};

export default authService;
