
import express from  "express"
import { createShortFilm, deleteShortFilm, getShortFilm, getShortFilms, updateShortFilm } from "../controller/shortfilmController.js"
import { verifyToken } from "../utils/verify.js"


const shortfilmRoute = express.Router()


shortfilmRoute.post('/create-film',verifyToken, createShortFilm)


shortfilmRoute.get('/get-film/:filmId', getShortFilm)


shortfilmRoute.get('/get-films', getShortFilms)


shortfilmRoute.put('/update-film/:filmId',verifyToken, updateShortFilm)


shortfilmRoute.delete('/delete-film/:filmId',verifyToken, deleteShortFilm)


export default shortfilmRoute