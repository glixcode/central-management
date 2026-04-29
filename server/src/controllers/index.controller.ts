import {Request, Response, NextFunction} from "express"

const indexController = (req:Request, res:Response, next:NextFunction) => {
    // req.message = "Controller Message";
    console.log('Log from Controller')
    next()

}

export {
    indexController,
}