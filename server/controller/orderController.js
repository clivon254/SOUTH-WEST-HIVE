
import Order from "../model/orderModel.js"
import Payment from "../model/paymentModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import axios from "axios"



// mpesa
export const mpesa = async (req,res,next) => {

    const token = req.token;

    const phone = req.body.phone.substring(1) ;

    const amount = req.body.amount ;

    const date = new Date();

    const timestamp = 
      date.getFullYear() + 
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2) 

    const shortcode = process.env.PAYBILL 

    const passkey = process.env.PASS_KEY ;

    const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")
    
    
    await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {    
            "BusinessShortCode": shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "TransactionType":"CustomerPayBillOnline",//"customerBuyGoodsOnline"    
            "Amount": amount,    
            "PartyA":`254${phone}`,    
            "PartyB":shortcode,    
            "PhoneNumber":`254${phone}`,    
            "CallBackURL":"https://7559-41-90-173-207.ngrok-free.app/api/order/callback",
            "AccountReference":`SOUTHWEST HIVE`,
            "TransactionDesc":"Test"
        },
        {
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }
    )
    .then((response) => {

        res.status(200).json(response.data)


    })
    .catch((err) => {

        console.log(err.message)

        res.status(400).json(err.message)

    })
    

}


// callback
export const callback = async (req,res,next) => {


    try
    {
        const callbackData = req.body

        if(!callbackData.Body.stkCallback.CallbackMetadata)
        {
            console.log(callbackData.Body)

            res.json("ok")
        }

        
        
        // console.log(callbackData.Body.stkCallback)
        const body = req.body.Body.stkCallback.CallbackMetadata;

        console.log(body)

        // Get amount
        const amountObj = body.Item.find(obj => obj.Name === 'Amount');

        const amount = amountObj.Value


        // Get Mpesa code
        const codeObj = body.Item.find(obj => obj.Name === 'MpesaReceiptNumber');
       
        const trnx_id = codeObj.Value


        // Get phone number
        const phoneNumberObj = body.Item.find(obj => obj.Name === 'PhoneNumber');
        
        const phone = phoneNumberObj.Value



        // TransactionDate
        const DateObj = body.Item.find(obj => obj.Name === 'TransactionDate');
        
        const date = DateObj.Value


        const payment = new Payment({
            amount,
            date,
            trnx_id,
            phone
        })


        await payment.save()

        res.status(200).json({success:true , payment})

    }
    catch(error)
    {
       next(error)

       console.log(error.message)
    }

}


// CASH ON DELIVERY
export const  COD = async (req,res,next) => {

    const userId = req.user.id

    const {items,address,amount,paymentmethod} = req.body

    try
    {

       const newOrder = new Order({
        userId,
        items,
        paymentmethod,
        amount,
        address
       })

       await newOrder.save()

       await User.findByIdAndUpdate(userId, {cartData:{}})

       res.status(200).json({success:true , newOrder})
    }
    catch(error)
    {
       next(error)
    }

}

// ADMIN ORDERS
export const adminorders = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to see this orders"))
    }

    try
    {
        const orders = await Order.find({userId:req.user.id}).sort({_id:-1})

        res.status(200).json({success:true, orders})
    }
    catch(error)
    {
       next(error)
    }

}

// USER OERDERS
export const userorders = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to seee the orders"))
    }

    try
    {
        const orders = await Order.find({}).sort({_id:-1})

        res.status(200).json({success:true ,orders})
    }
    catch(error)
    {
       next(error)
    }

}


// UPDATE STATUS
export const updateStatus = async (req,res,next) => {

    const {orderId ,status} = req.body

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update the status"))
    }

    try
    {

        const order = await Order.findById(orderId)

        if(!order)
        {
            return next(errorHandler(404,"order not found"))
        }
        
        await Order.findByIdAndUpdate(orderId ,{status:status})

        res.status(200).json({success:true ,message:"status has been update successfully"})
    }
    catch(error)
    {
       next(error)
    }

}




