// Middleware to verify JWT tokens on protected routes.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extends the Express Request type to carry the decoded token payload.
export interface AuthRequest extends Request {
  user?: { id: number; username: string };
}

// Reads the Authorization header, verifies the token, and attaches the payload to req.user.
// Returns 401 if the token is missing or invalid.
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not set.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: number; username: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
