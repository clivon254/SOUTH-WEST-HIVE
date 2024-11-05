
import express from  "express"
import { createShortFilm, deleteShortFilm, getShortFilm, updateShortFilm } from "../controller/shortfilmController.js"
import { verifyToken } from "../utils/verify.js"


const shortfilmRoute = express.Router()


shortfilmRoute.post('/create-film',verifyToken, createShortFilm)


shortfilmRoute.get('/get-film/:filmId', getShortFilm)


shortfilmRoute.get('/get-films', createShortFilm)


shortfilmRoute.put('/update-film/:filmId',verifyToken, updateShortFilm)


shortfilmRoute.post('/delete-film/:filmId',verifyToken, deleteShortFilm)


export default shortfilmRoute