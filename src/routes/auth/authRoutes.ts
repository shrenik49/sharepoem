import {Router} from 'express'
import { logout, refreshToken, signIn, signUp } from '../../controller/auth.controller'

export const authRoutes = Router()

authRoutes.post('/signup',signUp)
authRoutes.post('/signin',signIn)
authRoutes.post('/refersh-token',refreshToken)
authRoutes.post('/logout',logout)
