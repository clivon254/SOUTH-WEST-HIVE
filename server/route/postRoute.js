

import express from "express"
import { createPost, deletePost, getPopularContent, getPost, getPosts, stats, updatePost } from "../controller/postController.js"
import { verifyToken } from "../utils/verify.js"


const postRoute  = express.Router()


postRoute.post('/create-post',verifyToken, createPost)


postRoute.get('/get-post/:slug',verifyToken, getPost)


postRoute.get('/get-posts', getPosts)


postRoute.put('/update-post/:postId', verifyToken ,updatePost)


postRoute.delete('/delete-post/:postId',verifyToken, deletePost)


postRoute.post('/popular-content', getPopularContent)


postRoute.post('/stats',verifyToken, stats)


export default postRoute 