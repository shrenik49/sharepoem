import {Response,Request,NextFunction} from "express"
import pino from "pino"
import { sendResponse } from "../utils/httpResponseFormat";

const logger = pino()

export function errorHandler(
    err:any,
    req:Request,
    res:Response,
    next:NextFunction){
return sendResponse(res, err.status || 500, err.message || "Internal Server Error");

}