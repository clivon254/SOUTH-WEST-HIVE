
import mongoose from "mongoose"



const productSchema = new mongoose.Schema(
    {
        Item:{type:String , required:true},

        name:{type:String , required:true},

        category:{type:String ,required:true},

        offer:{type:Boolean ,required:true},

        regularPrice:{type:String ,required:true},

        discountPrice:{type:String ,required:true},

        instock:{type:Number},

        sizes:{type:Array ,default:undefined},

        images:{type:Array , default:[]}
    },
    {
        timestamps: true,
        minimize:true
    }
)


const Product = mongoose.model('Product',productSchema)


export default Product