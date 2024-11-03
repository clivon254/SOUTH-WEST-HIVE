

import mongoose from "mongoose"


const userSchema = new mongoose.Schema({

    email:{type:String, required:true , unique:true},

    password:{type:String, required:true},

    username:{type:String, required:true},

    isAdmin:{type:Boolean, default:false},

    accountType:{type:String, default:"user"},

    profilePicture:{type:String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},

    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"Follower"}],

    savedPost:[{type:mongoose.Schema.Types.ObjectId, ref:"Post"}],

    cartData:{type:Object , default:{}}
},
 {
    timestamps:true,
    minimize:false
})


const User = mongoose.model('User', userSchema) 


export default User
