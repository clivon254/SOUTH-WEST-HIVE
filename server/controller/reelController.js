
import Reel from "../model/reelsModel.js"
import { errorHandler } from "../utils/error.js"




export const createReel = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to upload a reel"))
    }

    const userId = req.user.id

    const {video,description} = req.body

    try
    {
        const newReel = new Reel({
            video,
            description,
            userId
        })

        await newReel.save()

        res.status(200).json({success:true , newReel})
    }
    catch(error)
    {
        next(error)
    }

}


export const getReel = async (req,res,next) => {

    const {reelId} = req.params

    try
    {
        const reel = await Reel.findById(reelId)

        if(!reel)
        {
            return next(errorHandler(404,"Reel not found"))
        }

        res.status(200).json({success:true ,reel})
    }
    catch(error)
    {
        next(error)
    }

}


export const getReels = async (req,res,next) => {

    try
    {
        const reels = await Reel.find({}).sort({_id:-1})

        res.status(200).json({success:true ,reels})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateReel = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are allowed to update the reel"))
    }

    const {reelId} = req.params

    try
    {
        const reel = await Reel.findById(reelId)

        if(!reel)
        {
            return next(errorHandler(404,"Reel not found"))
        }

        const updatedReel = await Reel.findByIdAndUpdate(
            reelId,
            {
                $set:{
                    video:req.body.video,
                    description:req.body.description
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedReel})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReel = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are allowed to update the reel"))
    }

    const {reelId} = req.params
    
    try
    {
        const reel = await Reel.findById(reelId)

        if(!reel)
        {
            return next(errorHandler(404,"Reel not found"))
        }

        await Reel.findByIdAndDelete(reelId)

        res.status(200).json({success:true ,message:`The video has been deleted`})

    }
    catch(error)
    {
        next(error)
    }

}


export const likeReel = async (req,res,next) => {

    const {reelId} = req.params

    const userId = req.user.id

    try
    {
        const reel = await Reel.findById(reelId)

        if(!reel)
        {
            return next(errorHandler(404,"Rell not found"))
        }

        const userIndex = reel.likes.indexOf(userId)

        if(userIndex === -1)
        {
            reel.numberOfLikes += 1 ;

            reel.likes.push(userId)
        }
        else
        {
            reel.numberOfLikes -= 1

            reel.likes.splice(userIndex , 1)
        }

      await reel.save()

      res.status(200).json({success:true , reel})
    }
    catch(error)
    {
        next(error)
    }

}