

import express from "express"
import { createComment, deleteComment, getPostComments, likeComment, updateComment } from "../controller/commentController.js"
import { verifyToken } from "../utils/verify.js"


const commentRoute = express.Router()



commentRoute.post("/create-comment/:postId",verifyToken, createComment)


commentRoute.get("/get-PostComments/:postId",verifyToken, getPostComments)


commentRoute.put("/update-comment/:commentId",verifyToken, updateComment)


commentRoute.delete("/delete-comment/:commentId",verifyToken, deleteComment)


commentRoute.post("/like-comment/:commentId",verifyToken, likeComment)



export default commentRoute