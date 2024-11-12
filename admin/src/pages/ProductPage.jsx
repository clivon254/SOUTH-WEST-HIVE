


import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import MPESA from "../assets/MPESA.png"
// swiper components
import {Swiper, SwiperSlide} from "swiper/react"
// Swiper styles
import "swiper/css"
import {Autoplay,Navigation} from "swiper/modules"
import SlideProducts from '../components/SlideProducts'


export default function ProductPage() {

    const {url,token,products} = useContext(StoreContext)

    const [product,setProduct] = useState(null)

    const [error ,setError] = useState(false)

    const [loading ,setLoading] = useState(false)

    const {productId} = useParams()

    const [image , setImage] = useState(null)

    const [sizes ,setSizes] = useState(null)

    const Items = products?.filter((prev) => prev.Item === product?.Item)

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

    // addsize
    const addSize = () => {}


    console.log(product)

    useEffect(() => {

        fetchProduct()

    },[productId])

  return (

    <>

        {!loading && !error && (

            <section className="section">

                <div className="w-full space-y-10 lg:space-y-14">

                    {/* top */}
                    <div className="w-full flex flex-col md:flex-row gap-10">

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

                            {/* lg and ` */}
                            <div className="w-full flex items-center gap-x-2">

                                {product?.images?.map((url,index) => (

                                    <img 
                                      key={index}
                                      src={url} 
                                      alt="product" 
                                      className={`${url === image ? "thumb-active" : "thumb"}`} 
                                      onClick={() => setImage(url)}
                                    />
                                ))}

                                {/* <Swiper
                                    className="mySwiper"
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    loop={true}
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
                                                className={`${image === url ? "thumb-active":"thumb"}`}
                                                onClick={() => setImage(url)}
                                            />

                                        </SwiperSlide>

                                    ))}

                                </Swiper> */}
                                
                            </div>

                            {/* small */}
                            <div className=""></div>

                            
                        </div>

                        {/* left */}
                        <div className="w-full lg:w-[45%] flex flex-col gap-y-5">

                            {/* name */}
                            <h2 className="title2 font-bold">{product?.name}</h2>

                            {/* prices */}
                            <div className="flex items-center gap-x-2">

                                {product?.discountPrice > 0 && (

                                <span className="font-semibold line-through">{product?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>

                               )}

                              <span className="title3 ">{product?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>

                                

                            </div>

                            {/* size */}
                            {product?.sizes && (

                                <div className="">

                                    <h3 className="label">size</h3>

                                    <div className="flex gap-x-2">

                                        {product?.sizes?.map((size,index) => (

                                            <div 
                                                className={`size ${size === sizes ? "size-active":""}`}
                                                onClick={() => addSize(size)}
                                                key={index}
                                            >
                                                {size}
                                            </div>

                                        ))}

                                    </div>

                                </div>

                            )}

                            {/* quantity */}
                            <div className="flex flex-col gap-1">
                                
                                <span className="text-sm font-semibold">Quantity (1 in cart)</span>

                                <div className="flex items-center">

                                    <span className="quantity ">-</span>

                                    <span className="quantity">3</span>

                                    <span className="quantity">+</span>

                                </div>

                            </div>

                            {/* addToCart */}
                            <button className="btn h-14 text-xl uppercase">
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

                        <h2 className="title">Related products</h2>
                        
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
