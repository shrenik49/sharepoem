import {Response,Request,NextFunction} from "express"
import pino from "pino"

const logger = pino()

export function errorHandler(
    err:any,
    req:Request,
    res:Response,
    next:NextFunction){
        logger.error(err)
        const status = err?.status || 500;
        const message = err?.message || "Internal Server Error";
        res.status(status).json({error:message })

}