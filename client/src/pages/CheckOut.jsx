import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import MPESA from "../assets/MPESA.png"
import COD from "../assets/COD.png"
import { Alert } from 'flowbite-react'
import axios from 'axios'
import {toast} from "sonner"


export default function CheckOut() {
  
    const {token ,url ,cartData ,products ,cartItems,fetchCart,cartAmount,setOrderId} = useContext(StoreContext)

    const [data ,setData] = useState({})

    const [paymentmethod , setPaymentMethod] = useState(null)

    const [shippingMethod, setShippingMethod] = useState(null)

    const [error ,setError] = useState(null)

    const [Loading ,setLoading] = useState(false)

    const navigate = useNavigate()

    const [shipping ,setShipping] = useState([
      {
        place:"self pick up",
        value:0,
      },
      {
        place:"Co operative",
        value:20,
      },
      {
        place:"Gataka",
        value:50,
      },
      {
        place:"Hardy",
        value:100,
      },
      {
        place:"Karen",
        value:100,
      },
      {
        place:"Rongai",
        value:100,
      },
      {
        place:"CBD",
        value:150,
      }
    ])

    const [paying ,setPaying] = useState([
      {
        value:"MPESA",
        img:MPESA
      },
      {
        value:"COD",
        img:COD
      }
    ])


    let TotalAmount = Number(cartAmount) + Number(shippingMethod || 0)


    // onChangeData
    const onChangeData = (e) => {

      setData({...data, [e.target.name]:e.target.value})

    }


    // changeShippingMethod
    const changeShippingMethod = (e) => {

      setShippingMethod(e.target.value)

    }


    // placeOrder
    const placeOrder = async () => {

      setError(null)

      setLoading(true)

      if(!paymentmethod)
      {
        setError("Please select a method")
      }

      let orderItems = []

      for(const items in cartItems)
        {

          if (typeof cartItems[items] === 'object')
          {

            for(const item in cartItems[items])
            {

              if(cartItems[items][item] > 0 )
              {
                
                const itemInfo = products.find((product) => product._id === items)

                if(itemInfo)
                {
                  itemInfo.size = item

                  itemInfo.quantity = cartItems[items][item]

                  orderItems.push(itemInfo)
                }
              }

            }

          }
          else
          {
            if(cartItems[items] > 0)
            {

              const itemInfo = products.find((product) => product._id === items)

              if(itemInfo)
              {
                itemInfo.quantity = cartItems[items]

                orderItems.push(itemInfo)
              }
              
            }
          }

      }

      let orderData = {
        address:data,
        items:orderItems,
        paymentmethod,
        amount:TotalAmount
      }

      switch(paymentmethod)
      {
        case 'MPESA':
          try
          {
            const res = await axios.post(url + "/api/order/mpesa",orderData,{headers:{token}})

            if(res.data.success)
            {
                toast.success("prompt sent to you phone")

                setLoading(false)

                navigate(`/confirm-payment/${res.data.resData.CheckoutRequestID}/${res.data.order._id}`)

                setData({})

                setShippingMethod(null)

                setPaymentMethod(null)
            }
            
          }
          catch(error)
          {
            console.log(error.message)

            setLoading(false)

            setError(error.message)
          }
          break ;
        case 'COD':
          try
          {
            const res = await axios.post(url + `/api/order/COD`,orderData,{headers:{token}})

            if(res.data.success)
            {
              setLoading(false)

              toast.success("Order completed successfully ")

              navigate('/orders')

              setPaymentMethod(null)

              setShippingMethod(null)
              
              setData({})

              fetchCart()
            }

          }
          catch(error)
          {
            console.log(error.message)

            setError(error.message)

            setLoading(false)
          }
          break ;
        default:
          
          console.log("Invalid payment method")

          setError("select a method of payment")

          break;
      }

    }
   

  return (

    <section className="section">


      <div className="flex flex-col lg:flex-row gap-y-10 gap-x-24">

        {/* Billing data */}
        <div className="w-full lg:w-[55%] space-y-10">


          {/* contact */}
          <div className="w-full space-y-3">

            <h2 className="title3">Contact</h2>

            <input 
              type="text" 
              className="input w-full" 
              placeholder="(07XXXXXX) *mpesa*"
              name="phone"
              onChange={onChangeData}
              value={data.phone}
              required
            />

          </div>


          {/* delivery */}
          <div className="w-full space-y-3">

            <h2 className="title3">Delivery Info</h2>

            <div className="w-full space-y-3">

              <input 
                  type="text" 
                  className="input w-full" 
                  placeholder="KENYA"
                  onChange={onChangeData}
                  name="country"
                  value={data.country}
              />

              <div className="w-full flex flex-col lg:flex-row gap-3">

                    <input 
                        type="text" 
                        className="input w-full" 
                        placeholder="First Name"
                        onChange={onChangeData}
                        name="firstName"
                        value={data.firstName}
                    />


                    <input 
                        type="text" 
                        className="input w-full" 
                        placeholder="Last Name"
                        onChange={onChangeData}
                        name="lastName"
                        value={data.lastName}
                    />

              </div>

              <input 
                type="text" 
                className="input w-full" 
                placeholder="Address"
                onChange={onChangeData}
                name="address"
                value={data.address}
              />

              <div className="w-full flex flex-col lg:flex-row gap-3">

                    <input 
                        type="text" 
                        className="input w-full" 
                        placeholder="City"
                        onChange={onChangeData}
                        name="City"
                        value={data.City}
                        required
                    />


                    <input 
                        type="text" 
                        className="input w-full" 
                        placeholder="Post Code (optional)"
                        onChange={onChangeData}
                        name="postcode"
                        value={data.postcode}
                    />

              </div>

            </div>

          </div>


          {/* shipping */}
          <div className="w-full space-y-3">

            <h2 className="title3">Shipping fee</h2>

            <div className="w-full">
              {shipping.map((ship,index) => (

                <div key={index} className="w-full flex items-center gap-x-5 p-3 py-5 border border-zinc-600 dark:border-zinc-300">

                  <input 
                    type="radio" 
                    className="flex-shrink" 
                    value={ship.value}
                    onChange={changeShippingMethod}
                    name={shippingMethod}
                  />

                  <div className="flex-1 flex justify-between items-center">

                    <span className="text-sm font-semibold">{ship.place}</span>

                    <span className="text-sm font-semibold">
                        {(ship.value).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                    </span>

                  </div>

                </div>

              ))}
            </div>

          </div>


        </div>

        {/* order summary */}
        <div className="w-full lg:w-[35%] space-y-3">
          
          <h2 className="title3">Order summary</h2>

          {/* products */}
          <div className="space-y-3">
            {cartData.map((item,index) => {

              const product = products.find((product) => product._id === item._id)

              return(

                <div 
                  key={index} 
                  className="flex items-start justify-between gap-x-5"
                >

                  <div className="flex items-start gap-x-5">

                    <div className="h-12 w-12 relative">

                      <img 
                        src={product?.images[0]}
                        alt="" 
                        className="h-full w-full " 
                      />

                      <span className="absolute top-0 -right-2 h-6 w-6 bg-secondaryLight dark:bg-secondaryDark rounded-full grid place-content-center text-base font-semibold">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="flex flex-col gap-y-2">

                      <span className="">{product?.name}</span>

                      {item?.size && (

                        <span className="">Size : {item.size}</span>

                      )}

                    </div>

                  </div>

                  <div className="text">
                     {(item.quantity * product?.discountPrice > 0 ? product.discountPrice : product.regularPrice).toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                  </div>

                </div>

              )

            })}
          </div>

          <hr className="hr"/>

          {/* cartTotal */}
          <div className="flex items-center justify-between">

            <span className="text-base font-bold">Cart Total</span>

            <span className="text-base font-semibold">
              {cartAmount?.toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>

          </div>

          <hr className="hr"/>

          {/* delivery */}
          <div className="flex items-center justify-between">

            <span className="text-base font-bold">Delivery fees</span>

            <span className="text-base font-semibold">
              {(shippingMethod || 0).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>

          </div>

          <hr className="hr"/>

          {/* delivery */}
          <div className="flex items-center justify-between">

            <span className="text-base font-bold">Total</span>

            <span className="text-base font-semibold">
              {(TotalAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
            </span>

          </div>

          <hr className="hr"/>

          {/* method of payment */}
          <div className="">

            <h2 className="text-xl  font-semibold">Select method of payment</h2>

            <div className="">
              {paying.map((pay,index) => (

                <div key={index} className="flex items-center gap-x-5">

                  <input 
                    type="radio" 
                    name="paymentmethod"
                    value={pay.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />

                  <div className="h-20 w-40">

                      <img 
                        src={pay.img}
                        alt="" 
                        className="w-full h-full" 
                      />

                 </div>

                </div>

              ))}
            </div>

          </div>

          {/* place order */}
          <button 
            className="h-16 w-full bg-black text-white "
            onClick={placeOrder}
            disabled={Loading}
          >
            {Loading ? 
            (
              <Loading />
            ) 
            : 
            ("PLACE ORDER")}
          </button>

          {error && (

            <Alert color="failure">{error}</Alert>

          )}

        </div>

      </div>

    </section>

  )
}
