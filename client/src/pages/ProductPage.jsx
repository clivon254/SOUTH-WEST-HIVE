


import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import MPESA from "../assets/MPESA.png"
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import SlideProducts from '../components/SlideProducts'
import {toast} from "sonner"
import {useSelector} from "react-redux"
import {Alert} from "flowbite-react"


export default function ProductPage() {

    const {url,token,products,fetchCart,cartItems} = useContext(StoreContext)

    const [product,setProduct] = useState(null)

    const {currentUser} = useSelector(state => state.user)

    const [error ,setError] = useState(false)

    const [loading ,setLoading] = useState(false)

    const {productId} = useParams()

    const [image , setImage] = useState(null)

    const [size ,setSize] = useState(null)

    const Items = products?.filter((prev) => prev.Item === product?.Item)

    const [alert ,setAlert] = useState(null)

    const navigate = useNavigate()

    // fetchProduct
    const fetchProduct = async () => {

        try
        {
            setLoading(true)

            setError(false)

            const res = await axios.get(url + `/api/product/get-product/${productId}`)

            if(res.data.success)
            {
                setProduct(res.data?.product)

                setImage(res?.data?.product?.images[0])

                setLoading(false)

                setError(false)
            }
        }
        catch(error)
        {
            console.log(error.message)

            setError(true)

            setLoading(false)
        }

    }


    // Add to cart 
    const addToCart = async () => {

        setAlert(null)

        if(!currentUser)
        {
            navigate('/sign-in')
        }

        let data ;

        if(product.sizes)
        {
            if(size === null)
            {
                return setAlert("Please choose a size")
            }

            data = {
                itemId:productId,
                size:size
            }
        }
        else
        {
            data = {
                itemId:productId
            }
        }
        

        try
        {
            const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

            if(res.data.success)
            {
                toast.success(res.data.message)

                fetchCart()

                setSize(null)
            }
            else
            {
                console.log("check the api")
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // removeCart
    const removeCart = async () => {

        setAlert(null)

        if(!currentUser)
        {
            navigate('/sign-in')
        }

        let data ;

        if(product.sizes)
        {
            if(size === null)
            {
                return setAlert("Please choose a size")
            }

            data = {
                itemId:productId,
                size:size
            }
        }
        else
        {
            data = {
                itemId:productId
            }
        }
        

        try
        {
            const res = await axios.post(url + "/api/cart/remove-cart",data,{headers:{token}})

            if(res.data.success)
            {
                toast.success(res.data.message)

                fetchCart()

                setSize(null)
            }
            else
            {
                console.log("check the api")
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }


    useEffect(() => {

        fetchProduct()

    },[productId])

  return (

    <>

        {!loading && !error && (

            <section className="section">

                <div className="w-full space-y-10 lg:space-y-14">

                    {/* top */}
                    <div className="w-full flex flex-col lg:flex-row gap-10">

                        {/* right */}
                        <div className="w-full lg:w-[55%] flex flex-col">

                            {/* main image */}
                            <div className="w-full h-[65vh] p-2">

                                <img 
                                    src={image} 
                                    alt="" 
                                    className="h-full w-full mx-auto" 
                                />

                            </div>

                            {/* lg thumbs */}
                            <div className="hidden w-full lg:flex items-center gap-x-2 p-2">

                                {product?.images?.map((url,index) => (

                                    <img 
                                      key={index}
                                      src={url} 
                                      alt="product" 
                                      className={`${url === image ? "thumb-active" : "thumb"}`} 
                                      onClick={() => setImage(url)}
                                    />
                                ))}

                                
                            </div>

                            {/* smallscreen thumb */}
                            <div className="w-full lg:hidden p-2">

                                <Swiper
                                    className="mySwiper"
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    // loop={true}
                                    autoPlay={
                                    {
                                        delay:2000,
                                        disableOnInteraction:false
                                    }
                                    }
                                    modules={[Autoplay,Navigation]}
                                    breakpoints={{
                                        0: {
                                        slidesPerView: 4,
                                        spaceBetween:10
                                        },
                                        640: {
                                        slidesPerView:4 ,
                                        spaceBetween: 10,
                                        },
                                        768: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                        },
                                        1024: {
                                        slidesPerView: 5,
                                        spaceBetween: 10,
                                        },
                                    }} 
                                    navigation={{
                                    prevEl:'.prev',
                                    nextEl:'.next'
                                    }}
                                >
                                    

                                {product?.images?.map((url,index) => (
                                    
                                    <SwiperSlide key={index}>
                                    
                                    <img 
                                        key={index}
                                        src={url}
                                        alt="" 
                                        className={`${url === image ? "thumb-active" : "thumb"}`}
                                        onClick={() => setImage(url)}
                                    />

                                    </SwiperSlide>
                                ))}

                                </Swiper>

                            </div>

                            
                        </div>

                        {/* left */}
                        <div className="w-full lg:w-[45%] flex flex-col gap-y-5">

                            {/* name */}
                            <h2 className="title2 font-bold">{product?.name}</h2>

                            {/* prices */}
                            <div className="">

                                {product?.discountPrice > 0 ? (
                                    
                                <div className="flex items-center gap-x-2">
                                   
                                    <span className="font-semibold line-through">{product?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>
                                   
                                    <span className="font-semibold title3">{product?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>
                                
                                </div>
                                ):(

                                <span className="title3 ">{product?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>
                               
                               )}

                                

                            </div>

                            {/* size */}
                            {product?.sizes && (

                                <div className="space-y-2">

                                    <h3 className="label">sizes available</h3>

                                    <div className="flex gap-x-2">

                                        {product?.sizes?.map((sizes,index) => (

                                            <div 
                                                className={`size ${sizes === size ? "size-active":""}`}
                                                onClick={() => setSize(sizes)}
                                                key={index}
                                            >
                                                {sizes}
                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                            {/* quantity */}
                             {!product?.sizes && (

                                <div className="flex flex-col gap-y-2">
                                    
                                    <span className="text-sm font-semibold">
                                        quantity ({cartItems[productId] || 0} in cart)
                                    </span>

                                    <div className="flex items-center">

                                        <span className="quantity " onClick={() => removeCart()}>-</span>

                                        <span className="quantity">{cartItems[productId] || 0}</span>

                                        <span className="quantity" onClick={() => addToCart()}>+</span>

                                    </div>

                                </div>

                            )}

                            {alert && (

                                <Alert color='failure'>{alert}</Alert>
                            )}

                            {/* addToCart */}
                            <button 
                                className="btn h-14 text-xl uppercase"
                                onClick={() => addToCart()}
                            >
                                Add to Cart
                            </button>

                            {/*buy it now  */}
                            <button className="btn2 h-14 text-xl uppercase">
                                Buy it now
                            </button>

                            {/* mpesa */}
                            <div className="grid place-content-center">

                                <img 
                                    src={MPESA} 
                                    alt="" 
                                    className="h-14 w-20 p-2 shadow-sm"
                                />

                            </div>

                        </div>

                    </div>

                    {/* bottom */}
                    <div className="space-y-5">

                        <h2 className="title3">Related products</h2>
                        
                        <SlideProducts products={Items}/>

                    </div>

                </div>

            </section>

        )}

        {loading && (

            <>

                <div className="grid place-content-center gap-x-4">

                    <div className="flex items-center mt-20 gap-x-4">

                        <span className="loading"/> Loading .....

                    </div>

                </div>

            </>

        )}


        {error && (

            <Error retry={fetchProduct}/>

        )}


    </>

  )

}
