

import mongoose from "mongoose"


const shortFilmSchema = new mongoose.Schema(
    {
        Link:{type:String , required:true},

        UserId:{type:String , required:true},

        description:{type:String , required:true}

    },
    // {timestamps:true}
)

const ShortFilm = mongoose.model('ShortFilm', shortFilmSchema)


export default ShortFilm ;