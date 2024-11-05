


import mongoose from "mongoose"



const reelsSchema = new mongoose.Schema({

    video:{type:String ,required:true},

    userId:{type:String ,required:true},

    likes:{type:Array ,default:[]},

    numberOflikes:{type:Number ,default:0},
},
 {
    timestamps:true
 }
)


const Reel = mongoose.model('Reel',reelsSchema)


export default Reel