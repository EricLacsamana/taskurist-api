import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

export const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return next(new UnauthorizedError('Unauthorized: No token provided'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                return next(new UnauthorizedError('Unauthorized: Token has expired'));
            } else if (err instanceof jwt.JsonWebTokenError) {
                return next(new UnauthorizedError('Unauthorized: Invalid or malformed token'));
            } else {
                return next(err);
            }
        }

        req.user = decoded;
        next();
    });
};

export const validateAccessToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
    
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = verifyAccessToken(token);
      req.payload = decoded;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  }
  

export const authenticateAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    throw new UnauthorizedError('Access denied, admin only');
};