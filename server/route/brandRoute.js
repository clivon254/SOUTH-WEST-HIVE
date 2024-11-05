
import express from  "express"
import { createBrand, deleteBrand, getBrand, updateBrand } from "../controller/brandController.js"
import { verifyToken } from "../utils/verify.js"


const brandRoute = express.Router()


brandRoute.post('/create-film',verifyToken, createBrand)


brandRoute.get('/get-film/:filmId', getBrand)


brandRoute.get('/get-films', createBrand)


brandRoute.put('/update-film/:filmId',verifyToken, updateBrand)


brandRoute.post('/delete-film/:filmId',verifyToken, deleteBrand)


export default brandRoute