

import mongoose from "mongoose";


const replySchema = new mongoose.Schema(
    {
       commentId:{type:mongoose.Schema.Types.ObjectId , ref:"Comment"},

       userId:{type:mongoose.Schema.Types.ObjectId , ref:"User"},

       content:{type:String , required:true}
    },
    {
        timestamps:true
    }
)

const Reply = mongoose.model("Reply", replySchema)


export default Reply