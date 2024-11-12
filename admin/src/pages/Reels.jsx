

import React, { useContext,useState,useRef,useEffect } from 'react'
import { StoreContext } from '../context/store'


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


// import required modules
import {Pagination } from 'swiper/modules';



export default function Reels() {

  
    const {reels, reelLoading, reelError ,fetchReels} = useContext(StoreContext)
  
    const [isVisible, setIsVisible] = useState(null); // Track which video is visible
    
    const videoRefs = useRef([]);

    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = videoRefs.current.indexOf(entry.target);
                setIsVisible(index); // Update the state to the index of the visible video
            }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of the video is visible
        });

        videoRefs.current.forEach(video => observer.observe(video));

        return () => {
            observer.disconnect(); // Cleanup on unmount
        };

    }, []);
   
  return (


    <section className="section">

        {!reelError && (<h1 className="title text-center">Reels</h1>)}

        {!reelLoading && !reelError && (

            <div className="">

                <div className="">

                    <Swiper
                        pagination={{
                        clickable: true,
                        }}
                        direction={'vertical'}
                        modules={[Pagination]}
                        className="mySwiper"
                        slidesPerView={1} // Only one video on screen at a time
                        spaceBetween={0} // No space between slides
                        loop={true} // Loop through the videos
                    >
                        {reels.map((reel, index) => (
                        <SwiperSlide key={index}>
                            <div className="video-container">
                            <video
                                ref={(el) => videoRefs.current[index] = el} // Reference for intersection observer
                                className="pointer pointer-events-none"
                                autoPlay={isVisible === index} // Autoplay only when video is visible
                                muted // To allow autoplay in all browsers
                                playsInline
                            >
                                <source src={reel.video} type="video/mp4" />
                            </video>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                    
                </div>

            </div>

        )}

        {reelLoading && !reelError && (

         <div className="grid place-content-center ">

                <div className="flex items-center gap-x-2 mt-20">

                    <span className="loading"/> Loading ....

                </div>
                
         </div>

        )}

        {reelError && (

         <Error retry={fetchReels}/>

        )}

    </section>



  )

}
