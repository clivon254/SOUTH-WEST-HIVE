import Comment from "../model/commentModel.js"
import Post from "../model/postModel.js"
import { errorHandler } from "../utils/error.js"



export const createComment = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler,"You are not allowed to comment")
    }

    const userId = req.user.id

    const {postId} = req.params

    const {content} = req.body

    try
    {
        const post = await Post.findById(postId)

        if(!post)
        {
            return next(errorHandler(404, "post not found"))
        }

        const newComment = new Comment({
            postId,
            userId,
            content
        })

        await newComment.save()

        res.status(200).json({success:true ,newComment})

    }
    catch(error)
    {
        next(error)
    }

}


export const getPostComments = async (req,res,next) => {
     
    const {postId} = req.params

    try
    {
        const comments = await Comment.find({postId})
                                    .sort({createdAt:-1})
                                    .populate({path:"userId"})

        res.status(200).json({success:true , comments})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateComment = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(403, "You are not allowed to update this post"))
    }

    const {commentId} = req.params

    try
    {
        const comment = await Comment.findById(commentId)

        if(!comment)
        {
            return next(errorHandler(404,"comment not found"))
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            {
                content:req.body.content
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedComment})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteComment = async (req,res,next) => {

    if(!req.user.id || !req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to update this post"))
    }

    const {commentId} = req.params

    try
    {
        const comment = await Comment.findById(commentId)

        if(!comment)
        {
            return next(errorHandler(404,"comment not found"))
        }

        await Comment.findByIdAndDelete(commentId)

        res.status(200).json({success:true , message:"comment has been deleted"})

    }
    catch(error)
    {
        next(error)
    }

}


export const likeComment = async (req,res,next) => {

    const {commentId} = req.params

    const userId = req.user.id

    try
    {
        const comment = await Comment.findById(commentId)

        if(!comment)
        {
            return next(errorHandler(404, "Comment is nit found"))
        }

        const userIndex = comment.likes.indexOf(userId)

        if(userIndex === -1)
        {
            comment.numberOfLikes += 1 ;

            comment.likes.push(userId)
        }
        else
        {
            comment.numberOfLikes -= 1

            comment.likes.splice(userIndex , 1)
        }

      await comment.save()

      res.status(200).json({success:true , comment})

    }
    catch(error)
    {
        next(error)
    }

}