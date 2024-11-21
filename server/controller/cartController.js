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

        if(!userData)
        {
            return next(errorHandler(404,"User not found "))
        }

        let cartData = await userData.cartData

        if(size)
        {

            if(cartData[itemId])
            {
                if(cartData[itemId][size])
                {
                    cartData[itemId][size] += 1
                }
                else
                {
                    cartData[itemId][size] = 1
                }
            }
            else
            {
                cartData[itemId] = {}

                cartData[itemId][size] = 1
            }
        }
        else
        {

            if(cartData[itemId])
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

    const {itemId,size} = req.body ;

    const userId = req.user.id

    try
    {

        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        const userData = await User.findById(userId)

        if(!userData)
        {
            return next(errorHandler(404, "User not found"))
        }

        let cartData = userData.cartData ;

        // check if the item is in the cart
        if(!cartData[itemId])
        {
            return next(errorHandler(404 ,`${product.name} not found in cart`))
        }

        //if the product requires size
        if(typeof cartData[itemId] === 'object')
        {
            if(size)
            {
                // if the size specified ,decrease the quantity or remove
                if(cartData[itemId][size])
                {
                    cartData[itemId][size] -= 1

                    if(cartData[itemId][size] <= 0)
                    {
                        delete delete cartData[itemId][size]
                    }
                }
                else
                {
                    return next(errorHandler(404 ,"Size not found in Cart"))
                }

                // If there are no sizes left for this item, remove the item from cartData
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        }
        else
        {
            // If the item does not require size
            cartData[itemId] -= 1;

            if (cartData[itemId] <= 0) {

                delete cartData[itemId];

            }
        }

        // Save the updated cart data back to the database
        await User.findByIdAndUpdate(userId, { cartData });

        res.status(200).json({success:true ,cartData ,message:`${product.name} removed from cart`})
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

        let cartAmount = 0;

        let itemCount = 0;

        // itemCount
        for (const itemId in cartData) {
            // Check if the product requires size
            if (typeof cartData[itemId] === 'object') {
                // Iterate through sizes and sum quantities
                for (const size in cartData[itemId]) {
                    itemCount += cartData[itemId][size]; // Add the quantity for each size
                }
            } 
            else 
            {
                // For non-size products, simply add the count
                itemCount += cartData[itemId]; // This will be 1 for non-size products
            }
        }

        // cartAmount
        for (const itemId in cartData)
        {
            const product = await Product.findById(itemId)

            if(!product)
            {
                continue; //skip if the product is not found
            }

            if (typeof cartData[itemId] === 'object')
            {
                for (const size in cartData[itemId])
                {
                    const quantity = cartData[itemId][size]
                    
                    const price = product.discountPrice > 0 ? product.discountPrice : product.regularPrice

                    cartAmount += price * quantity
                }
            }
            else
            {
                const quantity = cartData[itemId]

                const price = product.discountPrice > 0 ? product.discountPrice : product.regularPrice

                cartAmount += price * quantity
            }

        }

        res.status(200).json({success:true ,cartData ,itemCount ,cartAmount})

    }
    catch(error)
    {
        next(error)
    }

}