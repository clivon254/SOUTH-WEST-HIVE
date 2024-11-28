import mongoose from "mongoose"
import Follower from "../model/followersModel.js"
import Post from "../model/postModel.js"
import User from "../model/userModel.js"
import ShortFilm from "../model/shortfilmsModel.js"
import Product from "../model/productModel.js"
import Reel from "../model/reelsModel.js"
import Brand from "../model/brandModel.js"
import Podcast from "../model/podcastModel.js"
import Veiw from "../model/veiwModel.js"
import { errorHandler } from "../utils/error.js"




export const createPost = async (req,res,next) => {

    if(!req.user.isAdmin && !req.user.id)
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
        const posts = await Post.find({
                         ...(req.query.postId && {_id : req.query.postId}),
                         ...(req.query.category && {category : req.query.category}),
                         ...(req.query.userId && {userId : req.query.userId}),
                         })
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


export const savePosts = async (req,res,next) => {

    const userId = req.user.id

    const {postId} = req.params

    try
    {
        const post = await Post.findById(postId)

        if(!post)
        {
            return next(errorHandler(404,"post not found"))
        }

        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const {pass:password , ...rest} = user._doc

        // check if the post already exist
        const postIndex = user.savedPost.indexOf(postId)

        if(postIndex === -1)
        {
            user.savedPost.push(postId)

            await user.save()

            return res.status(200).json({success:true , rest ,message:'Post saved'})
        }
        else
        {
            user.savedPost.splice(postIndex,1)

            await user.save()

            return res.status(200).json({success:true , rest ,message:'removed from saved post'})
        }
    }
    catch(error)
    {
        next(error)
    }

}


export const updatePost = async (req,res,next) => {

    if(!req.user.isAdmin && !req.user.id)
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

    if(!req.user.isAdmin && !req.user.id)
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


        const totalSalespersonAdmin = await User.find({ accountType: "salesperson" }).countDocuments()


        const totalCatererAdmin = await User.find({ accountType: "caterer" }).countDocuments()


        const totalMediaAdmin = await User.find({ accountType: "media" }).countDocuments()


        const totalBrandsAdmin = await Brand.find().countDocuments()


        const totalShortfilmsAdmin = await ShortFilm.find().countDocuments()


        const totalPodcastsAdmin = await Podcast.find().countDocuments()


        const totalReelsAdmin = await Reel.find().countDocuments()

        
        const totalCateringAdmin = await Product.find({ Item: "Catering" }).countDocuments()


        const totalAccessoriesAdmin = await Product.find({ Item: "Accessories" }).countDocuments()


        const totalMerchendiseAdmin = await Product.find({ Item: "Merchendise" }).countDocuments()


        const last5PostsAdmin = await Post.find({}).limit(5).sort({ _id : -1 })


        const last5UsersAdmin = await User.find({}).limit(5).sort({ _id : -1 })


        const last5AccessoriesAdmin = await Product.find({ Item: "Accessories" }).limit(5).sort({ _id : -1 })


        const last5MerchendiseAdmin = await Product.find({ Item: "Merchendise" }).limit(5).sort({ _id : -1 })


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


        const followerStats = await User.aggregate([
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
        const totalBrandsSalesperson = await Brand.find().countDocuments()


        const totalAccessoriesSalesperson = await Product.find({ Item: "Accessories" }).countDocuments()


        const totalMerchendiseSalesperson = await Product.find({ Item: "Merchendise" }).countDocuments()


        const last5AccessoriesSalesperson = await Product.find({ Item: "Accessories" }).limit(5).sort({ _id : -1 })


        const last5MerchendiseSalesperson = await Product.find({ Item: "Merchendise" }).limit(5).sort({ _id : -1 })
        

        const last5Brands = await Brand.find().limit(5).sort({ _id : -1 })


        const accessStatsSalesperson = await Product.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate ,$lte:currentDate},
                    Item:"Accessories"
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


        const merchStatsSalesperson = await Product.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate ,$lte:currentDate},
                    Item:"Merchendise"
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


        // food
        const totalCateringCaterer = await Product.find({ Item: "Catering" }).countDocuments()


        const last5CateringCaterer = await Product.find({ Item: "Catering" }).limit(5).sort({ _id : -1 })


        const cateringStatsCaterer = await Product.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate ,$lte:currentDate},
                    Item:"Catering"
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


        // media
        const totalShortfilmsMedia = await ShortFilm.find({userId:userId}).countDocuments()


        const totalPodcastsMedia = await Podcast.find({userId:userId}).countDocuments()


        const totalReelsMedia = await Reel.find({userId:userId}).countDocuments()


        const last5ReelsMedia = await Reel.find({userId: userId}).limit(5).sort({ _id : -1 })


        const last5FilmsMedia = await ShortFilm.find({userId: userId}).limit(5).sort({ _id : -1 })


        const last5PodcastMedia = await Podcast.find({userId: userId}).limit(5).sort({ _id : -1 })


        const shortFilmStatsMedia = await ShortFilm.aggregate([
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


        const reelStatsMedia = await Reel.aggregate([
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
        

        const podcastStatsMedia = await Podcast.aggregate([
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




        res.status(200).json({
            success:true,
            totalPostsAdmin,
            totalWriterAdmin,
            totalUsersAdmin,
            last5PostsAdmin,
            last5AccessoriesAdmin,
            last5Brands,
            last5MerchendiseAdmin,
            last5UsersAdmin,
            veiwStatsAdmin,
            usersStatsAdmin,
            totalMerchendiseAdmin,
            totalAccessoriesAdmin,
            totalBrandsAdmin,
            totalCateringAdmin,
            totalCatererAdmin,
            totalSalespersonAdmin,
            totalMediaAdmin,
            totalPodcastsAdmin,
            totalShortfilmsAdmin,
            totalReelsAdmin,

            totalPosts,
            totalFollowers,
            last5Followers,
            last5Posts,
            veiwStats,
            followerStats,

            totalMerchendiseSalesperson,
            totalAccessoriesSalesperson,
            totalBrandsSalesperson,
            last5AccessoriesSalesperson,
            last5MerchendiseSalesperson,
            accessStatsSalesperson,
            merchStatsSalesperson,

            totalCateringCaterer,
            last5CateringCaterer,
            cateringStatsCaterer,

            totalShortfilmsMedia,
            totalReelsMedia,
            totalPodcastsMedia,
            last5FilmsMedia,
            last5ReelsMedia,
            last5PodcastMedia,
            shortFilmStatsMedia,
            reelStatsMedia,
            podcastStatsMedia
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
                    images:1,
                    userId:1,
                    category:1,
                    veiws:{$size:"$veiws"},
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

        const writers = await User.aggregate([
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

