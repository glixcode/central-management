import { Router } from "express";
import { createService, getServices } from "../controllers/services.controller.js";

const serviceRouter:Router = Router()

serviceRouter.post('/createService',createService)
serviceRouter.get('/getServices',getServices)

export default serviceRouter