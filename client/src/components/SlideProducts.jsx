

import React, { useContext, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import {  Autoplay,Navigation ,Pagination} from 'swiper/modules';
import { StoreContext } from '../context/store';
import ProductCard from './ProductCard';


export default function SlideProducts({products}) {

    const {productsLoading} = useContext(StoreContext)

    const [loader ,setLoader] = useState([{},{},{},{},{}])

  return (

    <>

        {productsLoading && (

            <div className="w-full">

                <Swiper
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
                        slidesPerView: 2,
                        spaceBetween:20
                        },
                        640: {
                        slidesPerView:3 ,
                        spaceBetween: 30,
                        },
                        768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                        },
                        1024: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                        },
                    }} 
                    navigation={{
                        prevEl:'.prev',
                        nextEl:'.next'
                    }}
                >
                    {loader?.map((product,index) => (

                        <SwiperSlide key={index}>

                            <div className="w-full  space-y-2">

                                <div className="w-full h-[250px] pulse"/>

                                <div className="space-y-1">

                                    <span className="h-3 w-full rounded-md pulse"/>

                                    <span className="h-3 w-full rounded-md pulse pulse"/>

                                </div>

                            </div>
                            
                        </SwiperSlide>

                    ))}
                </Swiper> 

            </div>

        )}

        {!productsLoading && products && (

            <div className="w-full">

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
                        slidesPerView: 2,
                        spaceBetween:20
                        },
                        640: {
                        slidesPerView:3 ,
                        spaceBetween: 30,
                        },
                        768: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                        },
                        1024: {
                        slidesPerView: 5,
                        spaceBetween: 40,
                        },
                    }} 
                    navigation={{
                    prevEl:'.prev',
                    nextEl:'.next'
                }}
                >
                    {products?.map((product,index) => (

                        <SwiperSlide key={index}>

                            <ProductCard  product={product}/>

                        </SwiperSlide>

                    ))}
                </Swiper>

            </div>

        )}

    </>

  )
}
