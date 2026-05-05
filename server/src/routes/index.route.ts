import {Router} from "express";

import userRouter from "./users.route.js"
import serviceRouter from "./services.route.js"
import utilsRouter from "./utils.route.js";

// New Modules
import authRouter from "./auth.routes.js";
import residentRouter from "./resident.routes.js";
import requestRouter from "./request.routes.js";

const router:Router = Router()

router.use('/', utilsRouter)
router.use('/users', userRouter)
router.use('/services', serviceRouter)

// New routes
router.use('/auth', authRouter);
router.use('/residents', residentRouter);
router.use('/requests', requestRouter);

export default router