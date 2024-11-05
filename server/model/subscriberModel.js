


import mongoose from "mongoose"


const subscriberSchema = new mongoose.model(
    {
        email:{type:String ,required:true}
    },
    {
        timestamps:true
    }
)


const Subscriber = mongoose.model('Subscriber',subscriberSchema)


export default Subscriber