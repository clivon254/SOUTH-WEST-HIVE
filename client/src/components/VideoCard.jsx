

import { Avatar } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { MdCameraAlt, MdChevronLeft, MdMusicNote } from 'react-icons/md'




export default function VideoCard({reel,isActive,onSwipe}) {

    const [isVideoPlaying ,setIsVideoPlaying] = useState(false)

    const videoRef = useRef(null)

    const touchStartRef = useRef(0);

    const observerRef = useRef(null);

    const onVideoPress = () => {

        if(isVideoPlaying)
        {
            // stop
            videoRef.current.pause()

            setIsVideoPlaying(false)
        }
        else
        {
            // play
            videoRef.current.play()

            setIsVideoPlaying(true)
        }
    }

    useEffect(() => {

        if(isActive)
        {
            videoRef.current.play()
        }
        else
        {
            videoRef.current.pause()
        }

    },[isActive])

    useEffect(() => {

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is in view, do nothing
                } 
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: 0.35 // Trigger when 35% of the video is visible
        });

        if (videoRef.current) {
            observerRef.current.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observerRef.current.unobserve(videoRef.current);
            }
        };
    }, []);

    const onTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientY; // Capture the starting touch position
    };

    const onTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientY; // Get the ending touch position

        if (touchStartRef.current - touchEnd > 250) {
            // Swipe up detected
            onSwipe('up');
        } else if (touchEnd - touchStartRef.current > 250) {
            // Swipe down detected
            onSwipe('down');
        }
    };

   

  return (

    <div 
        className="h-full w-full snap-start relative rounded-xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
    >

        {/* video header */}
        <div className="flex items-center justify-between absolute w-full p-2">

            <MdChevronLeft size={40} className="text-white"/>

            <h3 className="text-white text-xl">Reels</h3>

            <MdCameraAlt size={24} className="text-white"/>

        </div>

        {/* VIDEO */}
        <video 
          className="h-full w-full object-fill rounded-xl"
          ref={videoRef}
          onClick={onVideoPress}
          //   controls
          src={reel.video}
          alt='alt'
          loop
        />

        {/* video footer */}
        <div className="absolute bottom-0  w-full p-2">
            
            {/* video footer text */}
            <div className=" text-white flex items-center gap-x-2 ">

                <Avatar 
                    img={reel?.userId?.profilePicture}
                    rounded
                />

                <h3 className="">Follow</h3>
            </div>
            
            {/* video footer ticker */}
            <div className="flex items-center">

                <MdMusicNote className="text-white absolute"/>

                {/* <Ticker mode="smooth">

                    {({index}) => (

                        <>
                           <h1 className="pt-2 text-xs text-white text-center"> {reel?.description} </h1>
                        </>
                    )}
                </Ticker> */}

            </div>

        </div>

    </div>

  )
}
