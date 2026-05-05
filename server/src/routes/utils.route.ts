import { Router } from "express";
import { loginHandler, registerHandler, forgotPasswordHandler, createRoleHandler, getRolesHandler } from "../controllers/utils.controller.js";
import { seedDatabase } from "../utils/seed.js";

const utilsRouter: Router = Router()

utilsRouter.post('/login', loginHandler)
utilsRouter.post('/register', registerHandler)
utilsRouter.post('/forgot-password', forgotPasswordHandler)
utilsRouter.post('/create-role', createRoleHandler)
utilsRouter.get('/seed-database', seedDatabase)
utilsRouter.get('/get-roles', getRolesHandler)

export default utilsRouter