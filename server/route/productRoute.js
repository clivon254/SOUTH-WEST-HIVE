

import express from "express"
import { createAccessories, createFood, createMerchendise, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/productController.js"
import { verifyToken } from "../utils/verify.js"


const productRoute = express.Router()




productRoute.post('/create-merch', verifyToken, createMerchendise)


productRoute.post('/create-access', verifyToken, createAccessories)


productRoute.post('/create-food', verifyToken, createFood)


productRoute.get('/get-product/:productId', getProduct)


productRoute.get('/get-products', getProducts)


productRoute.put('/update-product/:productId', verifyToken, updateProduct)


productRoute.delete('/delete-product/:productId', verifyToken, deleteProduct)



export default productRoute