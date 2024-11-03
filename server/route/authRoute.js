

import express from "express"
import { ForgotPassword, Google, ResetPassword, SignIn, SignUp } from "../controller/authController.js"

const authRoute = express.Router()


authRoute.post('/sign-up', SignUp)

authRoute.post('/sign-in', SignIn)

authRoute.post('/Google', Google)

authRoute.post('/forgot-password', ForgotPassword)

authRoute.post('/reset-password/:token', ResetPassword)



export default authRoute