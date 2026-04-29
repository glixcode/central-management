import { Router } from "express";
import { createUser } from '../controllers/users.controller.js'

const userRouter:Router = Router();

userRouter.post('/createUser', [createUser])

export default userRouter