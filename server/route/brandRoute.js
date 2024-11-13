
import express from  "express"
import { createBrand, deleteBrand, getBrand, getBrands, updateBrand } from "../controller/brandController.js"
import { verifyToken } from "../utils/verify.js"


const brandRoute = express.Router()


brandRoute.post('/create-brand',verifyToken, createBrand)


brandRoute.get('/get-brand/:brandId', getBrand)


brandRoute.get('/get-brands', getBrands)


brandRoute.put('/update-brand/:brandId',verifyToken, updateBrand)


brandRoute.delete('/delete-brand/:brandId',verifyToken, deleteBrand)


export default brandRoute