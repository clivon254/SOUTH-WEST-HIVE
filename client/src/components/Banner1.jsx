

import React from 'react'
import campus2 from "../assets/campus2.jpeg"
import { Link } from 'react-router-dom'
import { MdArticle, MdHeadphones, MdRestartAlt, MdRestaurantMenu } from 'react-icons/md'
import Laelite from "../assets/La elite.jpeg"


export default function Banner1() {

  return (

    <div className="w-full  lg:h-[500px] 2xl:h-[600px] pb-10">
        
        {/* left */}
        <div className="w-full lg:h-full space-y-5">

            {/* image */}
            <div 
              className="w-full h-[41vh]  lg:h-[60%] xl:h-[70%] bg-primaryLight" 
              style={{
                backgroundImage: `url(${campus2})`,
                backgroundSize: 'cover',
                backgroundPosition:`center`
              }}
            >

              <div className="bg-primaryLight/50 dark:bg-primaryDark/50 w-full h-full p-3 overflow-clip">
              
                  <p className="text-white text-4xl sm:text-5xl 2xl:text-6xl font-title tracking-wider font-semibold">
                    Your campus ,your stories unfolding experinces,ideas and insipration
                  </p>

              </div>

            </div>

            {/*podcast & articles  */}        
            <div className="flex-1 flex flex-col md:flex-row gap-y-5 gap-x-3 p-3">
              
              <div className="border border-gray-600 p-3 rounded-md shadow-md bg-gradient-to-br  from-secondaryLight dark:from-secondaryLight  to-buttonLight dark:to-buttonDark  space-y-2">

                <p className="text-xl text-zinc-100  font-title">
                  Fresh perspectives, 
                  compelling stories—your campus insights, from our Articles
                </p>

                <button className="btn2 rounded-md ">

                  <Link to="/posts" className="flex items-center gap-x-3">
                      read articles 
                      <span className=""><MdArticle size={20}/></span>
                   </Link>

                </button>

              </div>

              <div className="border border-gray-600 space-y-3 p-3 bg-gradient-to-r from-primaryLight via-teal-500 dark:from-secondaryLight  to-buttonLight dark:to-buttonDark rounded-md">

                <p className="text-xl text-zinc-100  flex items-center">
                  Tune in to the heartbeat 
                  of the your camous community 
                </p>

                <button className="btn rounded-md  items-center gap-x-2">

                  <Link to="/podcasts" className="flex ">
                      Listen to podcast 

                      <MdHeadphones size={24}/>
                   </Link>

                  

                </button>

              </div>

              <div className="border border-gray-600 space-y-3 p-3 bg-gradient-to-tr  from-primaryLight via-emerald-500 dark:from-primaryDark  to-buttonLight dark:to-secondaryDark rounded-md">

                <p className="text-xl text-zinc-100  flex items-center">
                   Deliciously satisfying fuel your day with flavors you love
                </p>

                <button className="btn rounded-md  items-center gap-x-2">

                  <Link to="/la elite" className="flex ">
                      Order now
                      <MdRestaurantMenu size={24}/>
                   </Link>

                </button>

              </div>

            </div>

        </div>

    </div>

  )
}
