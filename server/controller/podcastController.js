
import Podcast from "../model/podcastModel.js"
import { errorHandler } from "../utils/error.js"



export const createPodcast = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to create the podcast"))
    }

    const {audio,title,backgroundPicture} = req.body

    const userId = req.user.id

    try
    {
        const newPodcast = new Podcast({
            audio,
            title,
            backgroundPicture,
            userId
        })

        await newPodcast.save()

        res.status(200).json({success:true , newPodcast})
    }
    catch(error)
    {
        next(error)
    }

}


export const getPodcast = async (req,res,next) => {

    const {podcastId} = req.params

    try
    {
        const podcast = await Podcast.findById(podcastId)

        if(!podcast)
        {
            return(errorHandler(404,"podcast not found"))
        }

        res.status(200).json({success:true ,podcast})
    }
    catch(error)
    {
        next(error)
    }

}


export const getPodcasts = async (req,res,next) => {

    try
    {
        const podcasts = await Podcast.find().sort({_id:-1})


        res.status(200).json({success:true , podcasts})

    }
    catch(error)
    {
        next(error)
    }

}


export const updatePodcast = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You not allowed to update this podcast"))
    }

    const {podcastId} = req.params

    const userId = req.user.id

    try
    {
        const podcast = await Podcast.findById(podcastId)

        if(!podcast)
        {
            return next(errorHandler(404,"podcast not found"))
        }

        const updatedPodcast = await Podcast.findByIdAndUpdate(
             podcastId,
             {
                $set:{
                    title:req.body.title,
                    audio:req.body.audio,
                    backgroundPicture:req.body.backgroundPicture,
                }
             },
             {new:true}
        )

        res.status(200).json({success:true ,updatedPodcast})

    }
    catch(error)
    {
        next(error)
    }

}


export const deletePodcast = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You not allowed to update this podcast"))
    }

    const {podcastId} = req.params

    const userId = req.user.id

    try
    {
        const podcast = await Podcast.findById(podcastId)

        if(!podcast)
        {
            return next(errorHandler(404,"podcast not found"))
        }

        await Podcast.findByIdAndDelete(podcastId)

        res.status(200).json({success:true , message:`${podcast.title} has been deleted`})

    }
    catch(error)
    {
        next(error)
    }

}