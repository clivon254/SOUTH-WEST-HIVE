

import Product from "../model/productModel.js"
import { errorHandler } from "../utils/error.js"



export const createMerchendise = async (req,res,next) => {
    
    if(!req.user.isAdmin || !req.user.id )
    {
        return next(errorHandler(403,`You are not allowed to create a merchendise `))
    }

    const {Item,name,category,instock,regularPrice,discountPrice,sizes,offer,images} = req.body

    try
    {
        const newProduct = new Product({
            Item,name,category,instock,regularPrice,discountPrice,sizes,offer,images
        })

        await newProduct.save()

        res.status(200).json({success:true , newProduct})
    }
    catch(error)
    {
        next(error)
    }

}


export const createAccessories = async (req,res,next) => {
    
    if(!req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403,"You are not allowed to create an accesories"))
    }
    
    const {Item,name,category,instock,regularPrice,discountPrice,offer,images} = req.body

    try
    {
        const newProduct = new Product({
            Item,name,category,instock,regularPrice,discountPrice,offer,images
        })

        await newProduct.save()

        res.status(200).json({success:true , newProduct})
    }
    catch(error)
    {
        next(error)
    }

}


export const createFood = async (req,res,next) => {
    
    if( !req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403,"You are not allowed to create a merchendise"))
    }
    
    const {Item,name,category,regularPrice,discountPrice,offer,images} = req.body

    try
    {
        const newProduct = new Product({
            Item,name,category,regularPrice,discountPrice,offer,images
        })

        await newProduct.save()

        res.status(200).json({success:true , newProduct})
    }
    catch(error)
    {
        next(error)
    }

}


export const getProduct = async (req,res,next) => {
    
    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404,"Product not found"))
        }

        res.status(200).json({success:true , product})
    }
    catch(error)
    {
        next(error)
    }

}


export const getProducts = async (req,res,next) => {
    
    try
    {
        const products = await Product.find({}).sort({_id:-1})

        const totalProduct = await Product.countDocuments()

        res.status(200).json({success:true ,totalProduct  ,products})
    }
    catch(error)
    {
        next(error)
    }

}


export const updateProduct = async (req,res,next) => {
    
    if(!req.user.isAdmin || !req.user.id)
    {
        return next(errorHandler(403,"You are not authorized to update the product"))
    }

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set:{
                    Item:req.body.Item,
                    name:req.body.name,
                    category:req.body.category,
                    discountPrice:req.body.discountPrice,
                    regularPrice:req.body.regularPrice,
                    offer:req.body.offer,
                    sizes:req.body.sizes,
                    colors:req.body.colors,
                    instock:req.body.instock,
                    images:req.body.images
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,updatedProduct})


    }
    catch(error)
    {
        next(error)
    }

}


export const deleteProduct = async (req,res,next) => {
    
    if(!req.user.isAdmin || !req.user.id)
    {
        return next(errorHandler(403,"You are not authorized to update the product"))
    }

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        await Product.findByIdAndDelete(productId)

        res.status(200).json({success:true , message:`${product.name} deleted successfully`})
    }
    catch(error)
    {
        next(error)
    }

}