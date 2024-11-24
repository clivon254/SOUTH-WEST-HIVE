
import ShortFilm from "../model/shortfilmsModel.js"
import { errorHandler } from "../utils/error.js"



export const createShortFilm = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to create a film"))
    }

    const UserId = req.user.id
     
    const {Link,description,title} = req.body

    try
    {
        const newShortFilm = new ShortFilm({
            Link,
            description,
            title,
            UserId
        })

        await newShortFilm.save()

        res.status(200).json({success:true , newShortFilm})
    }
    catch(error)
    {
        next(error)
    }

}


export const getShortFilm = async (req,res,next) => {

    const {filmId} = req.params

    try
    {
        const shortFilm = await ShortFilm.findById(filmId)

        if(!shortFilm)
        {
            return next(errorHandler(404,"Film not found"))
        }

        res.status(200).json({success:true ,shortFilm})
    }
    catch(error)
    {
        next(error)
    }

}


export const getShortFilms = async (req,res,next) => {

    try
    {
        const shortFilms = await ShortFilm.find({}).sort({_id:-1}).populate({path:"UserId"})

        res.status(200).json({success:true , shortFilms})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateShortFilm = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update this film"))
    }

    const {filmId} = req.params

    try
    {
        const shortFilm = await ShortFilm.findById(filmId)

        if(!shortFilm)
        {
            return next(errorHandler(404,"Film not found"))
        }

        const updatedFilm = await ShortFilm.findByIdAndUpdate(
            filmId,
            {
                $set:{
                    Link:req.body.Link,
                    description:req.body.description,
                    title:req.body.title
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedFilm})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteShortFilm = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update this film"))
    }

    const {filmId} = req.params
    
    try
    {
        const shortFilm = await ShortFilm.findById(filmId)

        if(!shortFilm)
        {
            return next(errorHandler(404,"Film not found"))
        }
        
        await ShortFilm.findByIdAndDelete(filmId)

        res.status(200).json({success:true , message:`The film has been deleted`})
    }
    catch(error)
    {
        next(error)
    }

}

