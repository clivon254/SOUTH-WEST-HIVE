
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"


export const SignUp = async (req,res,next) => {

    const {username,password,email} = req.body

    if(!username || !password || !email || username === "" || password === "" || email === "")
    {
        return next(errorHandler(400,"Please fill all the feilds"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        password: hashedPassword,
        email
    })

    try
    {
        await newUser.save()

        res.status(200).json({success:true , message:"You have successfully signed up"})
    }
    catch(error)
    {
        next(error)
    }

}


export const SignIn = async (req,res,next) => {
    
    const {email,password} = req.body

    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler(400,"Please fill all the feilds"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"User not found"))
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            return next(errorHandler(401,"Invalid Password"))
        }

        const token = jwt.sign(
            {
              id: user._id , 
              isAdmin : user.isAdmin,
              accountType: user.accountType
            },
            process.env.JWT_SECRETE
        )

        const {password:pass ,...rest} = user._doc

        res.status(200).json({success:true , rest ,token})
    }
    catch(error)
    {
        next(error)
    }

}


export const Google = async (req,res,next) => {

    try
    {
        const user = await User.findOne({email:req.body.email})

        if(user)
        {
            const token = jwt.sign(
                {id:user._id , isAdmin:user.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass ,...rest} = user._doc
    
            res.status(200).json({success:true , rest ,token})
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) +
                                      Math.random().toString(36).slice(-8)

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

            const newUser = new User({
                username:req.body.name.split(' ').join(' ').toLowerCase() + Math.random().toString(36).slice(-8),
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })

            await newUser.save()

            const token = jwt.sign(
                {id:newUser._id , isAdmin:newUser.isAdmin},
                process.env.JWT_SECRETE
            )

            const {password:pass, ...rest} = newUser._doc

            res.status(200).json({success:true , rest ,token})
        }
    }
    catch(error)
    {
        next(error)
    }

}


export const ForgotPassword = async (req,res,next) => {

    const {email} = req.body

    const user = await User.findOne({email})

    if(!user)
    {
        return next(errorHandler(404, "User not found"))
    }

    try
    {

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRETE,
            {expiresIn:'1h'}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const url = process.env.FRONTEND_URL

        var mailOptons = {
            from:"COOPING SOUTHWESTHIVE",
            to:user.email,
            subject:"RESET PASSWORD",
            text:`Click on this link to reset your password: ${url}/reset-password/${token}`
        }

        transporter.sendMail(mailOptons ,(error, info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }

        })

        res.status(200).json({success:true , message:"Link has been sent to your email"})

    }
    catch(error)
    {
        next(error)
    }

}


export const ResetPassword = async (req,res,next) => {
     
    const {token} = req.params

    const {password, confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(404, "User not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400, "Passwords do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({success:true ,message:"Password successfully reset"})

    }
    catch(error)
    {
        next(error)
    }

}