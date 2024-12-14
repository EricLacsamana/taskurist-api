import jwt from 'jsonwebtoken';

const authService = {
    generateToken: ({ id, username }) => {
        return jwt.sign({ id, username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    },
    generateInviteToken: (personId) => {
        const payload = { personId };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    },
};

export default authService;
