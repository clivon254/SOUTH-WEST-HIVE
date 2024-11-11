

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { createReply, deleteReply, getCommentReplies, likeReply, updateReply } from "../controller/replyController.js"


const replyRoute = express.Router()



replyRoute.post("/create-reply/:commentId",verifyToken, createReply)


replyRoute.get("/get-CommentReplies/:commentId", getCommentReplies)


replyRoute.put("/update-reply/:replyId",verifyToken, updateReply)


replyRoute.delete("/delete-reply/:replyId",verifyToken, deleteReply)


replyRoute.post("/like-reply/:replyId",verifyToken, likeReply)



export default replyRoute