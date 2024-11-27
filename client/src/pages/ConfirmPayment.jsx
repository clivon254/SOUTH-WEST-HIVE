


import React, { useContext, useEffect ,useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { TiInputChecked } from "react-icons/ti";
import { GiCancel } from "react-icons/gi";
import Loading from '../components/Loading';



export default function ConfirmPayment() {

  const {
        processingPayment,setProcessingPayment,
        paymentSuccess,setPaymentSuccess,
        paymentError,setPaymentError,
        url,token
     } 
        = useContext(StoreContext)

  const {CheckoutRequestID,orderId} = useParams()

  const [message ,setMessage] = useState(null)



  useEffect(() => {

   setProcessingPayment(true)

    // confirmPayment
    const confirmPayment = async () => {

        setProcessingPayment(true)

        try
        {
            const res  = await axios.post(url + `/api/order/confirm-payment/${CheckoutRequestID}/${orderId}`,{},{headers:{token}})

            if(res.data.success)
            {
                if(res.data.data.ResultCode === "0")
                {
                    setPaymentError(false)

                    setProcessingPayment(false)

                    setPaymentSuccess(true)

                    setMessage(res.data.message)

                    setProcessingPayment(false)
                }
                else
                {
                    setPaymentError(true)

                    setPaymentSuccess(false)

                    setProcessingPayment(false)

                    setMessage(res.data.message)
                }
            }
            else
            {
                console.log("check the api")

                setPaymentError(true)

                setMessage("Check the api")
            }

        }
        catch(error)
        {
            console.log(error.message)

            setPaymentError(true)
                    
            setPaymentSuccess(false)

            setMessage(error.message)

            
        }
        finally{

            setProcessingPayment(false)
        }

    }

    // Set a timeout to confirm payment after 60 seconds
    const timeoutId = setTimeout(() => {
        confirmPayment();
    }, 60000); // 60 seconds
  
    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);


  },[CheckoutRequestID, orderId])

  return (

    <section className="section ">

        {paymentSuccess && !paymentError && !processingPayment &&(

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] bg-secondaryLight dark:bg-secondaryDark shadow-xl rounded-md flex flex-col items-center gap-y-3 p-3">
                    
                    <span className="text-green-600">
                         
                        <TiInputChecked size={44}/>
                         
                    </span>

                    <p className="text-center text-xl font-title xl:text-3xl font-semibold">{message}</p>

                </div>

                <button className="btn2 rounded-md">

                    <Link to="/orders">
                        proceed to orders
                    </Link>

                </button>

            </div>

        )}

        {!paymentSuccess && !paymentError && processingPayment &&(

            <div className="grid place-content-center">

                    <Loading />

                    <p className="text-center">{message}</p>

            </div>

        )}

        {paymentError && (

            <div className="w-full h-[50vh] flex flex-col gap-y-3 items-center justify-center">

                <div className="w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] bg-secondaryLight dark:bg-secondaryDark shadow-xl rounded-md flex flex-col items-center gap-y-3 p-5">
                    
                    <span className="text-red-600">
                         
                        <GiCancel size={44}/>
                         
                    </span>

                    <p className="text-center text-xl font-title xl:text-3xl font-semibold">{message}</p>

                    

                </div>

                <button className="btn2 rounded-md">
                        <Link to="/checkout">
                            cancel
                        </Link>
                </button>

            </div>

        )}


    </section>

  )

}
