


import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { BsChatHeart, BsPostcardHeart } from "react-icons/bs"
import { SiFujifilm, SiMediatek, SiWritedotas } from "react-icons/si"
import { MdFoodBank } from "react-icons/md"
import { FaUsers } from "react-icons/fa"
import { IoMdFilm } from "react-icons/io"
import { FaPodcast, FaSalesforce } from 'react-icons/fa6'
import { GiClothes } from 'react-icons/gi'
import { TbAccessPoint } from 'react-icons/tb'


export default function Stats() {

  const {stats,statsLoading,statsError} = useContext(StoreContext)

  console.log(stats)

  const data = [
    {
        title:"TOTAL POST",
        icon:<BsPostcardHeart size={24}/>,
        value :(stats?.totalPostsAdmin || 0)
    },
    {
        title:"TOTAL REELS",
        icon:<SiFujifilm size={24}/>,
        value :(stats?.totalReelsAdmin || 0)
    },
    {
        title:"TOTAL FILMS",
        icon:<IoMdFilm size={24}/>,
        value :(stats?.totalShortFilmAdmin || 0)
    },
    {
        title:"TOTAL WRITERS",
        icon:<SiWritedotas size={24}/>,
        value :(stats?.totalWriterAdmin || 0)
    },
    {
        title:"TOTAL MEDIA",
        icon:<SiMediatek size={24}/>,
        value :(stats?.totalMediaAdmin || 0)
    },
    {
        title:"TOTAL CATERERS",
        icon:<BsChatHeart size={24}/>,
        value :(stats?.totalCatererAdmin || 0)
    },
    {
        title:"TOTAL SALESPERSON",
        icon:<FaSalesforce size={24}/>,
        value :(stats?.totalSalespersonAdmin || 0)
    },
    {
        title:"TOTAL USERS",
        icon:<FaUsers size={24}/>,
        value :(stats?.totalUsersAdmin || 0)
    },
    {
        title:"TOTAL ACCESSORIES",
        icon:<TbAccessPoint size={24}/>,
        value :(stats?.totalAccessoriesAdmin || 0)
    },
    {
        title:"TOTAL MERCHINDISE",
        icon:<GiClothes size={24}/>,
        value :(stats?.totalMerchendiseAdmin || 0)
    },
    {
        title:"TOTAL FOOD",
        icon:<MdFoodBank size={24}/>,
        value :(stats?.totalCateringAdmin || 0)
    },
    {
        title:"TOTAL PODCAST",
        icon:<FaPodcast size={24}/>,
        value :(stats?.totalPodcastsAdmin || 0)
    },
   ]

   const loader = [{},{},{},{},{},{},{},{}]

  return (

    <>

        {!statsLoading && !statsError && (

            <div className="grid gid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-8 gap-x-5 ">

                {data.map((stat,index) => (

                    <div key={index} className="p-3 space-y-3 border border-zinc-600 rounded-md dark:border-zinc-200">
                        
                        <div className="flex items-center justify-between">

                            <h1 className="font-title text-xl ">{stat.title}</h1>

                            <span className="">{stat.icon}</span>

                        </div>

                        <div className="font-logo text-xl">
                            {stat.value}
                        </div>

                    </div>

                ))}

            </div>

        )}

        {statsLoading && !statsError && (

            <div className="grid gid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-5 gap-x-3 ">

                    {loader.map((stat,index) => (

                        <div key={index} className="p-3 space-y-3 border shadow-sm border-zinc-300 rounded-md dark:border-zinc-600">
                            
                            <div className="flex items-center justify-between">

                                <span className="h-3 w-52 pulse rounded-md">{stat.title}</span>

                                <span className="h-10 w-10 rounded-full pulse">{stat.icon}</span>

                            </div>

                            <div className="pulse h-3 w-24 rounded-md">
                                {stat.value}
                            </div>

                        </div>

                    ))}

            </div>

        )}

    </>

  )

}
