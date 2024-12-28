import bcrypt from 'bcryptjs';
import authService from '../services/authService.js';
import userService from '../services/userService.js';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';
import { ConflictError } from '../errors/ConflictError.js';

import sendEmail from '../utils/email.js';

const authController = {
    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

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
                throw new UnauthorizedError('Email or password is incorrect');
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
            const { name, email, role } = req.body;

            const inviteToken = authService.generateAccessToken({ name, email, role });
            const attendeeName = name;
            const registrationLink = `/${process.env.WEB_URL}/signup?token=${inviteToken}`;
            const htmlContent = `
                <html>
                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                        <h3>You're Invited to Join Taskurist App!</h3>
                        <p>Dear ${attendeeName},</p>
                        <p>To get started, please create your account by clicking the button below:</p>
                        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 20px 0;">
                            <tr>
                                <td style="border-radius: 4px; background-color: #007BFF; text-align: center;">
                                    <a href="${registrationLink}" 
                                        style="
                                            display: inline-block; 
                                            padding: 10px 20px; 
                                            color: white; 
                                            font-size: 14px; 
                                            text-decoration: none; 
                                            font-weight: bold; 
                                            border-radius: 4px; 
                                            cursor: pointer;">
                                        Create Your Account and Register Now
                                    </a>
                                </td>
                            </tr>
                        </table>
                        <p>If you have any questions, feel free to contact us at <a href="mailto:support@taskurist.com">support@taskurist.com</a>.</p>
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
                console.log('test', plainTextContent);
            await sendEmail(email, 'Taskurist Account Invitation', plainTextContent, htmlContent)

            res.status(200).json({ message: 'Invite sent successfully' });
        } catch (err) {
            next(err);
        }
    },
    verifyInvite: async (req, res, next) => {
    const { name, email, role } = req.payload;

        try {

            res.status(200).json(req.payload);
        } catch (err) {
            next(err);
        }
    }
};

export default authController;
