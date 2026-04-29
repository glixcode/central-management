import { Request, Response} from "express"
import { IService }  from "../models/services.model.js"
import Service  from "../models/services.model.js"

const createService = async (req:Request, res:Response) => {
   const serviceInfo:IService = req.body
   const service = await Service.create(serviceInfo)
   res.send(service)
}

const getServices = async (req:Request, res:Response) => {
    const services = await Service.find()
    res.send(services)
  
}

export {
    createService,
    getServices
}