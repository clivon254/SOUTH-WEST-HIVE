

import React, { useContext } from 'react'
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

  return (

    <>

        {productsLoading && (

            <div className="">

                <Swiper></Swiper>

            </div>

        )}

        {!productsLoading && products && (

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
