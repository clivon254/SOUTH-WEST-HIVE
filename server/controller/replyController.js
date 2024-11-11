
import Comment from "../model/commentModel.js"
import Post from "../model/postModel.js"
import Reply from "../model/replyModel.js"
import { errorHandler } from "../utils/error.js"



export const createReply = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler,"You are not allowed to comment")
    }

    const userId = req.user.id

    const {commentId} = req.params

    const {content} = req.body

    try
    {
        const comment = await Comment.findById(commentId)

        if(!comment)
        {
            return next(errorHandler(404, "comment not found"))
        }

        const newReply = new Reply({
            commentId,
            userId,
            content
        })

        await newReply.save()

        res.status(200).json({success:true ,newReply})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCommentReplies = async (req,res,next) => {
     
    const {commentId} = req.params

    try
    {
        const replies = await Reply.find({commentId})
                                    .sort({createdAt:-1})
                                    .populate({path:'userId'})

        res.status(200).json({success:true , replies})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateReply = async (req,res,next) => {

    if(!req.user.id || !req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to update this post"))
    }

    const {replyId} = req.params

    try
    {
        const reply = await Reply.findById(replyId)

        if(!reply)
        {
            return next(errorHandler(404,"reply not found"))
        }

        const updatedReply = await Reply.findByIdAndUpdate(
            replyId,
            {
                content:req.body.content
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedReply})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReply = async (req,res,next) => {

    if(!req.user.id || !req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to update this post"))
    }

    const {replyId} = req.params

    try
    {
        const reply = await Reply.findById(replyId)

        if(!reply)
        {
            return next(errorHandler(404,"reply not found"))
        }

        await Reply.findByIdAndDelete(replyId)

        res.status(200).json({success:true , message:"reply has been deleted"})

    }
    catch(error)
    {
        next(error)
    }

}


export const likeReply = async (req,res,next) => {

    const {replyId} = req.params

    const userId = req.user.id

    try
    {
        const reply = await Reply.findById(replyId)

        if(!reply)
        {
            return next(errorHandler(404, "reply is nit found"))
        }

        const userIndex = reply.likes.indexOf(userId)

        if(userIndex === -1)
        {
            reply.numberOfLikes += 1 ;

            reply.likes.push(userId)
        }
        else
        {
            reply.numberOfLikes -= 1

            reply.likes.splice(userIndex , 1)
        }

      await reply.save()

      res.status(200).json({success:true , reply})

    }
    catch(error)
    {
        next(error)
    }

}