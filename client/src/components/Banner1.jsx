

import React, { useEffect, useRef } from 'react'
import campus2 from "../assets/campus2.jpeg"
import { Link } from 'react-router-dom'
import { MdArticle, MdHeadphones, MdRestartAlt, MdRestaurantMenu } from 'react-icons/md'
import Laelite from "../assets/La elite.jpeg"
import gsap from "gsap"
import {useGSAP} from "@gsap/react"



export default function Banner1() {

  const bannerRef = useRef(null)

  useEffect(() => {

    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        defaults:{ease:"power3.out", durartion: 0.6}
      })

      tl.from('.banner-title',{
        opacity:0,
        y:50,
        scale:0.95,
        duration:0.8,
        delay:0.5,
        stagger:0.15
      },
    "-=0.4")
       .from('.banner-subtitle',{
          opacity:0,
          y:50,
          scale:0.95,
          duration:0.8
       },
        "-=0.4"
      )

    },bannerRef)

    return () => ctx.revert()

  },[])

  return (

    <div ref={bannerRef} className="w-full  lg:h-[500px] 2xl:h-[600px] pb-10">
        
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
              
                  <p  className="banner-title text-white text-4xl  lg:text-5xl font-title tracking-wider font-semibold">
                    Your campus ,your stories unfolding experinces,ideas and insipration
                  </p>

              </div>

            </div>

            {/*podcast & articles  */}        
            <div className=" flex flex-col md:flex-row gap-y-5 gap-x-3 p-3">
              
              <div  className=" p-3 rounded-md shadow-md bg-gradient-to-br  from-secondaryLight dark:from-primaryDark  to-buttonLight dark:to-bgDark  space-y-2">

                <p id="title" className="banner-subtitle text-xl text-zinc-700 dark:text-zinc-100 font-semibold  font-title">
                  Fresh perspectives, 
                  compelling stories, your campus insights, from our Articles
                </p>

                <button className="btn2 rounded-md ">

                  <Link to="/posts" className="flex items-center gap-x-3">
                      read articles 
                      <span className=""><MdArticle size={20}/></span>
                   </Link>

                </button>

              </div>

              <div  className="border border-zinc-500 space-y-3 p-3 bg-gradient-to-r from-primaryLight dark:from-primaryDark via-secondaryLight to-bgLight dark:to-buttonDark rounded-md">

                <p id="title" className="banner-subtitle text-xl text-zinc-100 font-semibold  flex items-center">
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

              <div  className=" space-y-3 p-3 bg-gradient-to-tr  from-secondaryLight  dark:from-secondaryDark  to-buttonLight dark:to-primaryDark rounded-md">

                <p id="title" className="banner-subtitle text-xl text-zinc-700 dark:text-zinc-100 font-semibold  flex items-center">
                   Deliciously satisfying ,fuel your day with flavors you love
                </p>

                <button className="btn2 rounded-md  items-center gap-x-2">

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
