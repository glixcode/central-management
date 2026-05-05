import { Router } from 'express';
import { getRequests, createRequest, updateRequestStatus } from '../controllers/request.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';
import { tenantAware } from '../middlewares/tenant.middleware.js';

const router = Router();

router.use(authenticate);
router.use(tenantAware);

// Everyone can view requests (filtered by role in controller)
router.get('/', getRequests);

// Everyone can create a request
router.post('/', createRequest);

// Only Admins/Staff can update the status of a request
router.put('/:id/status', authorize(['SUPER_ADMIN', 'BARANGAY_ADMIN', 'STAFF']), updateRequestStatus);

export default router;
