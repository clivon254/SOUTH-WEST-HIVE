

import express from "express"
import { adminorders, callback, COD, cornfirmPayment, mpesa, updateStatus, userorders } from "../controller/orderController.js"
import { generateAccessToken, verifyToken } from "../utils/verify.js"


const orderRoute = express.Router()


orderRoute.post('/mpesa',verifyToken ,generateAccessToken, mpesa)


orderRoute.post('/callback', callback)


orderRoute.post('/confirm-payment/:CheckoutRequestID/:orderId',verifyToken,generateAccessToken, cornfirmPayment)


orderRoute.post('/COD',verifyToken, COD)


orderRoute.get('/get-adminOrders',verifyToken ,adminorders)


orderRoute.get('/get-userOrders', verifyToken , userorders)


orderRoute.put('/update-status', verifyToken , updateStatus)






export default orderRoute