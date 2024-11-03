
import mongoose from "mongoose"


const postSchema  = new mongoose.Schema(
    {
        title:{type:String , required:true},

        slug:{type:String , required:true , unique:true},

        description:{type:String , required:true},

        images:{type:Array , required:true},

        category:{type:String, required:true},

        veiws:[{type:mongoose.Schema.Types.ObjectId , ref:"Veiw"}],

        userId:{type:mongoose.Schema.Types.ObjectId , ref:"Veiw"},

        status:{type:Boolean, required:true},

    },
    {
        timestamps:true
    }
)

const Post = mongoose.model("Post", postSchema)


export default Post