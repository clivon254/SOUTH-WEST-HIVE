

import Follower from "../model/followersModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"



export const getUser = async (req,res,next) => {

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)
                              .populate({
                                path:"followers",
                                options:{sort:{_id : -1}},
                                perDocumentLimit:5,
                                populate:{
                                    path:"followerId"
                                }
                              })

        if(!user)
        {
            return next(errorHandler(404, "User not found"))
        }

        const {password ,...rest} = user._doc

        res.status(200).json({success:true ,rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const getUsers = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to see all the users"))
    }


    try
    {
        const users = await User.find()
                            .sort({_id:-1})
        
        const usersWithoutPassword = users.map((user) => {

            const {password, ...rest} = user._doc

            return rest ;
         })

        const totalUsers = await User.countDocuments()

        res.status(200).json({success:true , totalUsers , usersWithoutPassword})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateUser = async (req,res,next) => {

    const {userId} = req.params 

    if(req.user.id !== userId || !req.user.isAdmin)
    {
        return next(errorHandler(403, "you are not allowed to update this user"))
    }

    try
    {
        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password)
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture,
                    accountType:req.body.accountType
                }
            },
            {new:true}
        )

        const {password , ...rest} = updatedUser._doc

        res.status(200).json({success:true , rest})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteUser = async (req,res,next) => {
     
    const {userId} = req.params

    if(userId !== req.user.id || !req.params.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to delete this user"))
    }

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404, "user not found"))
        }

        await User.findByIdAndDelete(userId)
        
        res.status(200).json({success:true ,message:"You habve deleted the user successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const followWriter = async (req,res,next) => {

    try
    {
        const followerId = req.user.id

        const {userId} = req.params

        const checks = await Follower.findOne({followerId})

        const writer = await User.findById(userId)

        if(checks)
        {
            await Follower.findByIdAndDelete(checks._id)

            writer?.followers?.pull(checks._id)

            await writer.save()

            res.status(200).json({success:true , messgae:`you are  NOT following ${writer?.username}`})
        }
        else
        {
            const newFollower = await Follower.create({
                followerId:req.user.id,
                writerId:userId
            })

            writer?.followers?.push(newFollower?._id)

            await writer.save()

            await User.findByIdAndUpdate(userId ,writer ,{new:true})

            res.status(201).json({success:true , message:`You're now following the writer ${writer?.username} `})
        }
    }
    catch(error)
    {
        next(error)
    }

}


