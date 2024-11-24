

import React, { useContext } from 'react'
import { FaPlay } from "react-icons/fa";
import { StoreContext } from '../context/store';


export default function PodcastCard({podcast}) {

  const {playWithId} = useContext(StoreContext)

  return (

    <div className="group bg-black/50 dark:bg-white/50 rounded-md p-2 relative transition-all ease-in-out">

        <h1 className="text-xl xl:text-2xl font-semibold text-white dark:text-textSecondaryDark group-hover:underline">{podcast.title}</h1>

        <div className="h-[300px]  group-hover:scale-75 p-5 transition-all ease-in-out flex items-center justify-center">

            <img 
                src={podcast.backgroundPicture} 
                alt="" 
                className="h-full rounded-xl w-[250px]" 
            />

        </div>

        <p className="text-white">

          <span className="font-semibold text-base">
            {(() => {
              const createdAtDate = new Date(podcast.createdAt);
              const currentYear = new Date().getFullYear();
              
              if (createdAtDate.getFullYear() === currentYear) {
                // Format for this year: "Nov 6"
                return createdAtDate.toLocaleString('default', { month: 'short' }) + ' ' + createdAtDate.getDate();
              } else {
                // Format for other years: "March 2023"
                return createdAtDate.toLocaleString('default', { month: 'long' }) + ' ' + createdAtDate.getFullYear();
              }
            })()}
          </span>
          {" "}
          <span className="">.</span>
          {" "}
          {podcast.duration >= 3600 ? (
            <span className="font-semibold text-base">
              {Math.floor(podcast.duration / 3600).toString().padStart(2, '0')}hrs {" "}
              {Math.floor((podcast.duration % 3600) / 60).toString().padStart(2, '0')}mins {" "}
              {Math.floor(podcast.duration % 60).toString().padStart(2, '0')}secs
            </span>
          ) 
          : 
          (
            <span className="font-semibold text-base">
              {Math.floor(podcast.duration / 60).toString().padStart(2, '0')}mins {" "}
              {Math.floor(podcast.duration % 60).toString().padStart(2, '0')}secs
            </span>
          )}
          {"  "}
          <span className="">.</span>
          {" "}
          <span className="text-sm font-title font-light text-zinc-200">
            {podcast.description.slice(0,300)}
          </span>

        </p>

        <span 
          className="absolute bottom-2 right-2 z-50 bg-primaryLight dark:bg-secondaryDark p-2 h-16 w-16 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer"
          onClick={() => playWithId(podcast._id)}
        >
          <FaPlay size={24} className="text-white"/>
        </span>

    </div>

  )
}
