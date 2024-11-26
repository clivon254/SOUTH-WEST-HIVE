


import express from "express"
import { addToCart, getCart, removeCart } from "../controller/cartController.js";
import { verifyToken } from "../utils/verify.js";


const cartRoute = express.Router()


cartRoute.post('/add-cart', verifyToken, addToCart)


cartRoute.post("/remove-cart", verifyToken, removeCart)


cartRoute.get("/get-cart", verifyToken, getCart)


export default cartRoute ;