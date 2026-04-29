import { Request, Response} from "express"

const createUser = (req:Request, res:Response) => {
   res.send(req.body)
}

export {
    createUser
}