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
            const { name, email, username, password, inviteToken } = req.body;

            if (!username || !password || !inviteToken) {
                throw new BadRequestError('Username, password, and invite token are required');
            }

            const decodedInviteData = jwt.verify(inviteToken, process.env.JWT_SECRET);
          
            const currentTimestamp = Date.now() / 1000;

            if (decodedInviteData.exp < currentTimestamp) {
                throw new UnauthorizedError('Invite token has expired');
            }
        
            const invitePersonId = decodedInviteData.personId;

            const person = await personService.getPersonById(invitePersonId);

            if (!person) {
                throw new NotFoundError('Associated person not found for the invite');
            }

            const existingUser = await userService.findUserByUsername(username);
            if (existingUser) {
                throw new ConflictError('Username already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await userService.createUser({ name, email, username, password: hashedPassword });

            const newPerson = await personService.createPerson({ name, email, userId: newUser._id });

            const token = authService.generateToken(newUser);

            res.status(201).json({
                message: 'User registered successfully',
                user: newUser,
                person: newPerson,
                jwt: token,
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;
        try {
            const user = await userService.findUserByUsername(username); 
            if (!user) {
                throw new NotFoundError('Username or password is incorrect');
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                throw new UnauthorizedError('Username or password is incorrect');
            }

            const token = authService.generateToken(user);

            res.status(200).json({
                user: { id: user._id, username: user.username },
                jwt: token,
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
