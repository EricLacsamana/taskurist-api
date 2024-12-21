import bcrypt from 'bcryptjs';
import authService from '../services/authService.js';
import userService from '../services/userService.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { ConflictError } from '../errors/ConflictError.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import sendEmail from '../utils/email.js';

const authController = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            console.log('body', req.body);
            if (!name || !email || !password) {
                throw new BadRequestError('Name, Password, and Invite token are required');
            }

            // TODO: Implement invite token scheme
            // const decodedInviteData = jwt.verify(inviteToken, process.env.JWT_SECRET);
          
            // const currentTimestamp = Date.now() / 1000;

            // if (decodedInviteData.exp < currentTimestamp) {
            //     throw new UnauthorizedError('Invite token has expired');
            // }
        
            // const invitePersonId = decodedInviteData.personId;

            // const person = await personService.getPersonById(invitePersonId);

            // if (!person) {
            //     throw new NotFoundError('Associated person not found for the invite');
            // }

            const existingUser = await userService.findUserByEmail(email);

            if (existingUser) {
                throw new ConflictError('Email already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await userService.createUser({ name, email, password: hashedPassword });

            const token = authService.generateToken(newUser);

            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                accessToken: token,
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const user = await userService.findUserByEmail(email); 
            if (!user) {
                throw new NotFoundError('Email or password is incorrect');
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                throw new UnauthorizedError('Email or password is incorrect');
            }

            const token = authService.generateToken(user);

            res.status(200).json({
                user: { 
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                accessToken: token,
            });
        } catch (err) {
            next(err);
        }
    },
    sendInvite: async (req, res, next) => {
        try {
            const { personId } = req.body;
            const inviteToken = authService.generateInviteToken(personId);
            const attendeeName = 'John';
            const registrationLink = '';
            const htmlContent = `
                <html>
                <body>
                    <h1>You're Invited to Join Taskurist App!</h1>
                    <p>Dear ${attendeeName},</p>
                    <p>To get started, please create your account by clicking the link below:</p>
                    <p><a href="${registrationLink}">Create Your Account and Register Now</a></p>
                    <p>If you have any questions, feel free to contact us at support@taskurist.com.</p>
                    <p>We look forward to having you onboard!</p>
                </body>
                </html>
            `;

            const plainTextContent = `
                Taskurist App Registration Invitation

                Dear ${attendeeName},

                To get started, please create your account by following the registration link below:
                ${registrationLink}

                If you have any questions, contact us at support@taskurist.com.

                We look forward to having you onboard!`;

            await sendEmail(req.user.email, 'Seminar Confirmation', plainTextContent, htmlContent)

            res.status(200).json({ message: 'Invite sent successfully', inviteToken });
        } catch (err) {
            next(err);
        }
    },    
};

export default authController;
