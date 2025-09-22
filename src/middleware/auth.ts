
import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'
export interface AuthRequest extends Request{
    user?:{id:number,email:string,username:string}    
}

export function authMiddleware(req:AuthRequest,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(403).send({message:"Please provide the token"})
    }
    const token = authHeader.split(' ')[1]

    try {
        const payloadCheck = jwt.verify(token,config.jwt.accessSecret) as any
        req.user = {id:payloadCheck.sub,email:payloadCheck.email,username:payloadCheck.username}
        next()
    } catch (error) {
        return res.status(403).send({message:"Invalid or expired token"})
    }
}