

import express from "express"
import { createReel, deleteReel, getReel, getReels, likeReel, updateReel } from "../controller/reelController.js"
import { verifyToken } from "../utils/verify.js"



const reelRoute = express.Router()


reelRoute.post('/create-reel', verifyToken, createReel)


reelRoute.get('/get-reel/:reelId', getReel)


reelRoute.get('/get-reels',getReels)


reelRoute.put('/update-reel/:reelId',verifyToken,updateReel)


reelRoute.delete('/delete-reel/:reelId',verifyToken, deleteReel)


reelRoute.post('/like-reel/:reelId',verifyToken, likeReel)



export default reelRoute