

import express from "express"
import { createPost, deletePost, getPopularContent, getPost, getPosts, savePosts, stats, updatePost } from "../controller/postController.js"
import { verifyToken } from "../utils/verify.js"


const postRoute  = express.Router()


postRoute.post('/create-post',verifyToken, createPost)


postRoute.post('/get-post/:slug', getPost)


postRoute.post('/save-post/:postId', verifyToken ,savePosts)


postRoute.get('/get-posts', getPosts)


postRoute.put('/update-post/:postId', verifyToken ,updatePost)


postRoute.delete('/delete-post/:postId',verifyToken, deletePost)


postRoute.post('/popular-content', getPopularContent)


postRoute.post('/stats',verifyToken, stats)


export default postRoute 