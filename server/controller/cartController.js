import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const addToCart = async (req,res,next) => {
    
    const {itemId,size,color} = req.body

    const userId = req.user.id

    try
    {
        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404, "Product not found"))
        }

        const userData = await User.findById(userId)


        let cartData = await userData.cartData


        if(cartData[itemId] && size && color)
        {
            if(cartData[itemId][size][color] > 1)
            {
                cartData[itemId][size][color] += 1
            }
            else
            { 
                cartData[itemId] = {}

                cartData[itemId][size] = {}

                cartData[itemId][size][color] = {}

                cartData[itemId][size][color] = 1
            }
        }
        else
        {
            if(cartData[itemId] > 1)
            {
                cartData[itemId] += 1
            }
            else
            {   
                cartData[itemId] = 1
            }
            
        }

        await User.findByIdAndUpdate(userId ,{cartData})
     
        res.status(200).json({success:true , message:`${product.name} is added to cart`})

    }
    catch(error)
    {
        next(error)
    }

}


export const removeCart = async (req,res,next) => {

    try
    {

    }
    catch(error)
    {
        next(error)
    }

}


export const getCart = async (req,res,next) => {

    const userId = req.user.id

    try
    {
        let userData = await User.findById(userId)

        if(!userData)
        {
            return next(errorHandler(404,"user not found"))
        }

        let cartData = await userData.cartData

        res.status(200).json({success:true ,cartData})

    }
    catch(error)
    {
        next(error)
    }

}