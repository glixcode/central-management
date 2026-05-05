import { Request, Response, NextFunction } from 'express';
import { IUserRole } from '../models/Roles.js';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !req.user.role) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const userRole = req.user.role as IUserRole;

    if (!roles.includes(userRole.roleName)) {
      res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
      return;
    }

    next();
  };
};
