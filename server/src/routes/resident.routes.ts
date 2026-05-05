import { Router } from 'express';
import { getResidents, getResidentById, createResident, updateResident, deleteResident } from '../controllers/resident.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';
import { tenantAware } from '../middlewares/tenant.middleware.js';

const router = Router();

// Apply auth and tenant middlewares to all routes
router.use(authenticate);
router.use(tenantAware);

// Only Admins and Staff can view lists of residents
router.get('/', authorize(['SUPER_ADMIN', 'BARANGAY_ADMIN', 'STAFF']), getResidents);

// Everyone can view a specific resident (if they have the ID, e.g. their own profile)
// Realistically, RESIDENT should only see their own profile, but we rely on ID match
router.get('/:id', getResidentById);

// Only Admins and Staff can create or modify residents
router.post('/', authorize(['SUPER_ADMIN', 'BARANGAY_ADMIN', 'STAFF']), createResident);
router.put('/:id', authorize(['SUPER_ADMIN', 'BARANGAY_ADMIN', 'STAFF']), updateResident);
router.delete('/:id', authorize(['SUPER_ADMIN', 'BARANGAY_ADMIN']), deleteResident);

export default router;
