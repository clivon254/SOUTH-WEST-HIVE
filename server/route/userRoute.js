

import express from "express"
import { deleteUser, followWriter, getUser, getUsers, updateUser } from "../controller/userController.js"
import { verifyToken } from "../utils/verify.js"


const userRoute = express.Router()


userRoute.get('/get-user/:userId', getUser)

userRoute.get('/get-users', verifyToken, getUsers)

userRoute.put('/update-user/:userId', verifyToken ,updateUser)

userRoute.delete('/delete-user/:userId', verifyToken, deleteUser)

userRoute.post('/follow-writer/:userId',verifyToken ,followWriter)


export default userRoute