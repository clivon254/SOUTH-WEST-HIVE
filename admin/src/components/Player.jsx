

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { IoMdVolumeHigh ,IoIosPause } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { MdSkipNext , MdSkipPrevious} from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { SlLoop } from "react-icons/sl";


export default function Player() {


  const {time,seekBar,seekBg,playStatus,play,pause,track,previous,next,seekSong} = useContext(StoreContext)
    

  return (

    <div className="absolute bottom-0 left-0  bg-primaryLight w-full ">
       
       <div className="w-full flex items-center justify-between px-4 py-2">

            {/* title */}
            <div className="hidden lg:flex items-center gap-4 ">

                <img src={track?.backgroundPicture} alt="" className="w-12" />

                <div className="text-zinc-100">
                    
                    <p className="">{track?.title.slice(0,12)}...</p>

                    <p className="">{track?.description.slice(0,20)}...</p>
                    
                </div>

            </div>

            {/* CONTROLLS */}
            <div className="flex flex-col items-center gap-y-2 m-auto">

                {/* controlls */}
                <div className="flex gap-x-4 text-zinc-100 items-center">

                    <IoShuffle size={24} className="cursor-pointer"/>
                                     
                    <MdSkipPrevious 
                        size={24} 
                        className="cursor-pointer"
                        onClick={previous}
                    />
                    

                    {playStatus ? 
                        (

                            <IoIosPause size={24} onClick={pause} className="cursor-pointer"/>
                        )
                        :
                        (

                            <FaPlay className="cursor-pointer" onClick={play}/>  
                        )
                    }           

                    <MdSkipNext 
                        size={24} 
                        className="cursor-pointer"
                        onClick={next}
                    />
                    
                    <SlLoop size={24} className="cursor-pointer"/>

                </div>
                
                {/* duration */}
                <div className="flex items-center gap-x-5">

                    <p className="text-zinc-100 text-xs md:text-sm">
                        {time.currentTime.hour}:{time.currentTime.minute}:{time.currentTime.second}
                    </p>

                    <div onClick={seekSong} ref={seekBg} className="w-[30vh] md:w-[40vh] max-w-[500px] bg-zinc-200 rounded-full cursor-pointer">

                        <hr ref={seekBar} className="h-1 border-none w-10 bg-secondaryLight rounded-full"/>

                    </div>

                    <p className="text-zinc-100 text-xs md:text-sm">
                        {time.totalTime.hour}:{time.totalTime.minute}:{time.totalTime.second}
                    </p>

                </div>

            </div>
            
            {/* volume */}
            <div className="hidden lg:flex items-center gap-2 opacity-75">

                <IoMdVolumeHigh className="text-zinc-100"/>

                <div className="w-20 h-1 rounded-full bg-bgLight"/>

            </div>

       </div>

    </div>

  )

}
