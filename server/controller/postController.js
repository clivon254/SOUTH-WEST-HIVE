import mongoose from "mongoose"
import Follower from "../model/followersModel.js"
import Post from "../model/postModel.js"
import User from "../model/userModel.js"
import Veiw from "../model/veiwModel.js"
import { errorHandler } from "../utils/error.js"




export const createPost = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.accountType !== "writer")
    {
        return next(errorHandler(403 ,"you are not allowed to create post"))
    }

    try
    {

        const {title,description,images,category} = req.body

        if(!title || !description || !images || !category)
        {
            return next(errorHandler(401 ,"please fill all the feilds"))
        }

        try
        {
            const slug = req.body.title
                                .split(' ')
                                .join('-')
                                .toLowerCase()
                                .replace(/[^a-zA-Z0-9-]/g, '');

            const newPost = new Post({
                title,
                slug,
                description,
                images,
                category,
                userId:req.user.id
            })

            await newPost.save()

            res.status(200).json({success:true ,newPost})
        }
        catch(error)
        {
            next(error)
        }

    }
    catch(error)
    {
        next(error)
    }

}


export const getPost = async (req,res,next) => {

    try
    {
        const {slug} = req.params

        const {userId} = req.body

        const post = await Post.findOne({slug})
                               .populate({ path: "userId"})

        if(!post)
        { 
            return next(errorHandler(404, "post not found"))
        }

        if(userId)
        {
            const existingVeiw =await  Veiw.findOne({postId:post._id, userId})

            if(!existingVeiw)
            {
                const newVeiw = await Veiw.create({
                    userId,
                    postId:post._id
                })
            

                post.veiws.push(newVeiw?._id)

                await Post.findByIdAndUpdate(post._id ,post)

            }

            res.status(200).json({success:true ,post})
        }
        else
        {
            res.status(200).json({success:true , post})
        }
    }
    catch(error)
    {
        next(error)
    }
}


export const getPosts = async (req,res,next) => {
   
    try
    {
        const posts = await Post.find({})
                                .sort({_id:-1})
                                .populate({path:"userId"})

        const totalPosts = await Post.countDocuments()


        res.status(200).json({success:true , totalPosts ,posts})
    }
    catch(error)
    {
        next(error)
    }
}


export const updatePost = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.accountType !== "writer")
    {
        return next(errorHandler(403, "You are not allowed to update the post"))
    }


    const {postId} = req.params

    try
    {
        const post = await Post.findById(postId)

        if(!post)
        {
            return next(errorHandler(404, "post not found"))
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    category:req.body.category,
                    images:req.body.images,
                    status:req.body.status,
                 }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedPost ,message:`${post.title} updated successfully`})
    }
    catch(error)
    {
        next(error)
    }
}


export const deletePost = async (req,res,next) => {

    if(!req.user.isAdmin || req.user.accountType !== "writer")
    {
        return next(errorHandler(403, "You are not allowed to delete the post"))
    }

    const {postId} = req.params

    try
    {
        const post = await Post.findById(postId)

        if(!post)
        {
            return next(errorHandler(404, "post not found"))
        }

        await Post.findByIdAndDelete(postId)

        res.status(200).json({success:true , message:`${post.title} has been DELETED`})
    }
    catch(error)
    {
        next(error)
    }
}


export const stats = async (req,res,next) => {

    try
    {
        const {query} = req.query

        const userId = req.user.id

        const numofDays = Number(query) || 28

        const currentDate = new Date()

        const startDate = new Date()

        startDate.setDate(currentDate.getDate() - numofDays)



        // Admin
        const totalPostsAdmin = await Post.find({}).countDocuments()


        const totalUsersAdmin = await User.find({}).countDocuments()


        const totalWriterAdmin = await User.find({ accountType: "writer" }).countDocuments()


        const last5PostsAdmin = await Post.find({}).limit(5).sort({ _id : -1 })


        const last5UsersAdmin = await User.find({}).limit(5).sort({ _id : -1 })


        const veiwStatsAdmin = await Veiw.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate ,$lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d" , date:"$createdAt"}
                    },
                    Total:{$sum:1}
                }
            },
            {$sort: {_id: 1}}
        ])


        const usersStatsAdmin = await User.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate ,$lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m-%d" , date:"$createdAt"}
                    },
                    Total:{$sum:1}
                }
            },
            {$sort: {_id: 1}}
        ])



        // writers
        const totalPosts = await Post.find({ userId: userId} ).countDocuments()

        
        const totalFollowers = await Follower.find({ writerId : userId }).countDocuments()


        const last5Followers = await Follower.find({writerId : userId}).countDocuments()


        const last5Posts = await Post.find({userId: userId}).limit(5).sort({ _id : -1 })


        const veiwStats = await Veiw.aggregate([
            {
                $match:{
                    userId:new mongoose.Types.ObjectId(userId),
                    createdAt:{$gte:startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: { format : "%Y-%m-%d", date:"$createdAt"}
                    },
                    Total: { $sum: 1 }
                }
            },
            { $sort: {_id: 1 } }
        ])

        const followerStats = await Veiw.aggregate([
            {
                $match:{
                    userId:new mongoose.Types.ObjectId(userId),
                    createdAt:{$gte:startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString: { format : "%Y-%m-%d", date:"$createdAt"}
                    },
                    Total: { $sum: 1 }
                }
            },
            { $sort: {_id: 1 } }
        ])

        // Sales


        // food


        res.status(200).json({
            success:true,
            totalPostsAdmin,
            totalWriterAdmin,
            totalUsersAdmin,
            last5PostsAdmin,
            last5UsersAdmin,
            veiwStatsAdmin,
            usersStatsAdmin,
            totalPosts,
            totalFollowers,
            last5Followers,
            last5Posts,
            veiwStats,
            followerStats
        })

    }
    catch(error)
    {
        next(error)
    }
}


export const getPopularContent = async (req,res,next) => {

    try
    {
        const posts = await Post.aggregate([
            {
                $match:{
                    status:true
                }
            },
            {
                $project:{
                    title:1,
                    slug:1,
                    image:1,
                    category:1,
                    veiws:{$size:"$veiw"},
                    createdAt:1
                }
            },
            {
                $sort:{ veiws : -1}
            },
            {
                $limit:5
            },
        ])

        const writers = await Post.aggregate([
            {
                $match:{
                    accountType:"writer"
                }
            },
            {
                $project:{
                    username:1,
                    profilePicture:1,
                    followers:{ $size : "$followers"},
                }
            },
            {
                $sort:{ followers: -1}
            },
            {
                $limit:5
            },
        ])

        res.status(200).json({success:true , posts , writers})
    }
    catch(error)
    {
        next(error)
    }
}