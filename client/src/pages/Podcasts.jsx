

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import PodcastCard from '../components/PodcastCard'
import Player from '../components/Player'

export default function Podcasts() {

  const {podcasts,audioRef,track} = useContext(StoreContext)

  console.log(podcasts)

  return (

    <section className="section space-y-10 relative">

      
      <div className="h-[70vh] overflow-y-scroll mb-16">
          
        {podcasts.length  > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5">

            {podcasts.map((pod,index) => (

              <PodcastCard podcast={pod} index={index}/>

            ))}

          </div>
        ) 
        : 
        (
          <p className="title2">
            The are no podcasts yet 
          </p>
        )}

        

      </div>

      <Player />

      <audio ref={audioRef} src={track?.audio} preload='auto'></audio>

    </section>
    
  )

}
