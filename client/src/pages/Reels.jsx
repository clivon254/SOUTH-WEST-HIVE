
import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/store";
import VideoCard from "../components/VideoCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';


export default function Reels() {

    const {reels} = useContext(StoreContext)

    console.log(reels)

    const [activeIndex ,setActiveIndex] = useState(0)

    const handleSwipe = (direction) => {

      if(direction === 'up')
      {
        setActiveIndex((prevIndex) => Math.min(prevIndex + 1, reels.length -1))
      }
      else if(direction === 'down')
      {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      }

    }

  return (
    
    // <section className="section grid place-items-center gap-y-5 ">



    //     <div className="app__videos w-full lg:w-[70%] relative rounded-[20px] bg-white h-[75vh] max-w-md max-h-[1200px] overflow-scroll ">
           
           
           

    //     </div>


    // </section>

    <div className="section snap-mandatory snap-y">

      <Swiper
        direction={'vertical'}
        className="mySwiper h-[80vh] w-full sm:w-[80%]  md:w-[60%] lg:w-[40%] lg:h-[60vh]  rounded-xl snap-y snap-mandatory"
      >

        {reels.map((reel,index) => (

          <SwiperSlide key={reel._id}>

            <VideoCard  
              reel={reel}
              isActive={index === activeIndex}
              onSwipe={handleSwipe}
            />

          </SwiperSlide>

        ))}

      </Swiper>

    </div>

  );
};


