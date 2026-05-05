import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as any;

    const user = await User.findById(decoded.userId).populate('role');
    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
