

import { Avatar } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { MdCameraAlt, MdChevronLeft, MdMusicNote } from 'react-icons/md'




export default function VideoCard({reel}) {

    const [isVideoPlaying ,setIsVideoPlaying] = useState(false)

    const videoRef = useRef(null)

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

  return (

    <div className="h-full w-full snap-start relative">

        {/* video header */}
        <div className="flex items-center justify-between absolute w-full p-2">

            <MdChevronLeft size={40} className="text-white"/>

            <h3 className="text-white text-xl">Reels</h3>

            <MdCameraAlt size={24} className="text-white"/>

        </div>

        {/* VIDEO */}
        <video 
          className="h-full w-full object-fill"
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
                    img={reel.userId.profilePicture}
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
