

import express from "express"
import { adminorders, callback, COD, mpesa, updateStatus, userorders } from "../controller/orderController.js"
import { generateAccessToken, verifyToken } from "../utils/verify.js"


const orderRoute = express.Router()


orderRoute.post('/mpesa',generateAccessToken, mpesa)


orderRoute.post('/callback', callback)


orderRoute.post('/COD',verifyToken, COD)


orderRoute.get('/get-adminOrders',verifyToken ,adminorders)


orderRoute.get('/get-userOrders', verifyToken , userorders)


orderRoute.put('/update-status', verifyToken , updateStatus)






export default orderRoute