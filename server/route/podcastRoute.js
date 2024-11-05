

import express from "express"
import { createPodcast, deletePodcast, getPodcast, getPodcasts, updatePodcast } from "../controller/podcastController.js"
import { verifyToken } from "../utils/verify.js"



const podcastRoute = express.Router()



podcastRoute.post('/create-podcast',verifyToken, createPodcast)



podcastRoute.get('/get-podcast/:podcastId', getPodcast)



podcastRoute.get('/get-podcasts', getPodcasts)



podcastRoute.put('/update-podcast/:podcastId',verifyToken, updatePodcast)



podcastRoute.delete('/delete-podcast/:podcastId',verifyToken, deletePodcast)




export default podcastRoute