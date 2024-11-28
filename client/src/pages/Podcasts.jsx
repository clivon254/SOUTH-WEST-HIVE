

import React, { useContext ,useState} from 'react'
import { StoreContext } from '../context/store'
import PodcastCard from '../components/PodcastCard'
import Player from '../components/Player'
import Error from '../components/Error'

export default function Podcasts() {

  const {podcasts,podcastLoading,podcastError,fetchPodcast,audioRef,track} = useContext(StoreContext)

  const [loader ,setLoader] = useState([{},{},{}])

  console.log(podcasts)

  return (

    <>

      {!podcastError && (

        <section className="section space-y-10 relative">

          <div className="h-[70vh] overflow-y-scroll mb-16">
            
            {!podcastLoading && podcasts && (

              <>

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

              </>

            )}

            {podcastLoading && (

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-5">

                  {loader.map((load,index) => (

                      <div key={index} className="group bg-black/50 dark:bg-white/50 rounded-md p-2 relative transition-all ease-in-out">

                          <span className="h-4 w-32 pulse rounded-full"/>

                          <div className="h-[300px]  group-hover:scale-75 p-5 transition-all ease-in-out flex items-center justify-center">

                              <div className="h-full rounded-xl w-[250px] pulse "/>

                          </div>

                          <span className="h-7 w-[70%] rounded-full pulse"/>
                          
                      </div>

                  ))}

                </div>

            )}

          </div>

          <Player />

          <audio ref={audioRef} src={track?.audio} preload='auto'></audio>

        </section>

      )}

      {podcastError && (

        <Error retry={fetchPodcast}/>

      )}

    </>
    
  )

}
