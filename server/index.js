

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import authRoute from "./route/authRoute.js"
import userRoute from "./route/userRoute.js"
import postRoute from "./route/postRoute.js"
import commentRoute from "./route/commentRoute.js"
import replyRoute from "./route/replyRoute.js"
import productRoute from "./route/productRoute.js"
import cartRoute from "./route/cartRoute.js"
import podcastRoute from "./route/podcastRoute.js"
import reelRoute from "./route/reelRoute.js"
import shortfilmRoute from "./route/shortfilmRoute.js"
import brandRoute from "./route/brandRoute.js"


const app = express()

const PORT = process.env.PORT


app.use(cors())

app.use(express.json())


// db conection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))



// ROUTE
app.use('/api/auth', authRoute)


app.use('/api/user', userRoute)


app.use('/api/post', postRoute)


app.use('/api/comment' , commentRoute)


app.use('/api/reply', replyRoute)


app.use('/api/product' , productRoute)


app.use("/api/cart", cartRoute)


app.use("/api/podcast", podcastRoute)


app.use("/api/reel", reelRoute)


app.use("/api/film" ,shortfilmRoute)


app.use("/api/brand" ,brandRoute)



// api
app.get('/',(req,res) => {

    res.send("Hello COOP SOUTH WEST HIVE")

})



// listening
app.listen(PORT,(err) => {
    
    if(err)
    {
        console.log(err.message)
    }
    else
    {
        console.log(`server running on ${PORT}`)
    }
})



app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({success:false , message:message})

})