
import mongoose from "mongoose" 


const podcastSchema = new mongoose.Schema(
    {
        title:{type:String , required:true},

        audio:{type:String , required:true},

        userId:{type:String , required:true},

        backgroundPicture:{type:String , required:true},

    },
    {
        timestamps:true
    }
)



const Podcast = mongoose.model("Podcast",podcastSchema)


export default Podcast