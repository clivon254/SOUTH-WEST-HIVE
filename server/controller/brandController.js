

import Brand from "../model/brandModel.js"
import { errorHandler } from "../utils/error.js"



export const createBrand = async (req,res,next) => {
    
    if(!req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403,"You are not allowed to create a brand"))
    }

     
    const {image,name} = req.body

    try
    {
        const newBrand = new Brand({
            image,
            name
        })

        await newBrand.save()

        res.status(200).json({success:true , newBrand})
    }
    catch(error)
    {
        next(error)
    }

}


export const getBrand = async (req,res,next) => {

    const {brandId} = req.params

    try
    {
        const brand = await Brand.findById(brandId)

        if(!brand)
        {
            return next(errorHandler(404,"Film not found"))
        }

        res.status(200).json({success:true ,brand})
    }
    catch(error)
    {
        next(error)
    }

}


export const getBrands = async (req,res,next) => {

    try
    {
        const brands = await Brand.find({}).sort({_id:-1})

        res.status(200).json({success:true , brands})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateBrand = async (req,res,next) => {

    if(!req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403,"You are not allowed to update this film"))
    }

    const {brandId} = req.params

    try
    {
        const brand = await Brand.findById(brandId)

        if(!brand)
        {
            return next(errorHandler(404,"Film not found"))
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            brandId,
            {
                $set:{
                    image:req.body.image,
                    name:req.body.name
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedBrand})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteBrand = async (req,res,next) => {

    if(!req.user.isAdmin && !req.user.id)
    {
        return next(errorHandler(403,"You are not allowed to update this film"))
    }

    const {brandId} = req.params
    
    try
    {
        const brand = await Brand.findById(brandId)

        if(!brand)
        {
            return next(errorHandler(404,"Film not found"))
        }
        
        await Brand.findByIdAndDelete(brandId)

        res.status(200).json({success:true , message:`The film has been deleted`})
    }
    catch(error)
    {
        next(error)
    }

}

