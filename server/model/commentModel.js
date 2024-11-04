



import mongoose from "mongoose";


const commentSchema = new mongoose.Schema(
    {
       postId:{type:mongoose.Schema.Types.ObjectId , ref:"Post"},

       userId:{type:mongoose.Schema.Types.ObjectId , ref:"User"},

       content:{type:String , required:true},

       likes:{type:Array ,default:[]},

       numberOfLikes:{type:Number , default:0}
    },
    {
        timestamps:true
    }
)

const Comment = mongoose.model("Comment", commentSchema)


export default Comment