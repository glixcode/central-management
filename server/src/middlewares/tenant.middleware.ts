import { Request, Response, NextFunction } from 'express';
import { IUserRole } from '../models/Roles.js';

export const tenantAware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || !req.user.role) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  const userRole = req.user.role as IUserRole;

  // If SUPER_ADMIN, they can potentially see all data, so we don't force a tenant scope on their requests
  // unless they explicitly provide a barangayId in query/params.
  if (userRole.roleName === 'SUPER_ADMIN') {
    return next();
  }

  // Ensure that users tied to a specific barangay only access their own data
  if (!req.user.barangayId) {
    res.status(403).json({ message: 'Tenant access required' });
    return;
  }

  // Inject barangayId into query / body for downstream processing
  if (req.method === 'GET') {
    req.query.barangayId = req.user.barangayId.toString();
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    req.body.barangayId = req.user.barangayId.toString();
  }

  next();
};
