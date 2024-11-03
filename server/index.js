

import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"

const app = express()

const PORT = process.env.PORT


app.use(cors())

app.use(express.json())


// db conection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))


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