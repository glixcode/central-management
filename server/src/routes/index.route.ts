import {Router} from "express";

import userRouter from "./users.route.js"
import serviceRouter from "./services.route.js"

const router:Router = Router()

router.use('/users', userRouter)
router.use('/services', serviceRouter)

export default router