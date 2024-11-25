

import React, { useRef ,useEffect} from 'react'
import merchendise from "../assets/merchendise.jpeg"
import LOGO from "../assets/merch.png"
import { Link } from 'react-router-dom'
import { MdCollections, MdRestaurantMenu } from 'react-icons/md'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GiClothes } from 'react-icons/gi'

gsap.registerPlugin(ScrollTrigger)

export default function Banner3() {

    const banner3Ref = useRef(null)

    useEffect(() => {
  
      const ctx = gsap.context(() => {
  
        const tl = gsap.timeline({
          defaults:{ease:"power3.out", durartion: 0.6}
        })
  
        tl.from('.banner3-logo',{
          opacity:0,
          y:50,
          scale:0.95,
          duration:0.8,
          delay:0.5,
          stagger:0.15,
          scrollTrigger:{
              trigger: ".banner3-logo", 
              start: "top 80%", 
              toggleActions: "play none none none"
          }
        },
        "-=0.4")
        tl.from('.banner3-title',{
            opacity:0,
            y:50,
            scale:0.95,
            duration:0.8,
            delay:0.5,
            stagger:0.15,
            scrollTrigger:{
                trigger: ".banner3-title", 
                start: "top 80%", 
                toggleActions: "play none none none"
            }
          },
          "-=0.4"
        )
  
      },banner3Ref)
  
      return () => ctx.revert()
  
    },[])

  return (

    <div 
        className="h-[60vh] lg:h-[50vh] w-full" 
        style={{
            backgroundImage:`url(${merchendise})`,
            backgroundSize: 'cover',
            backgroundPosition:`center`
        }}
        ref={banner3Ref}
    >

        <div className="w-full h-full bg-primaryLight/75 dark:bg-primaryDark/75 flex flex-col-reverse md:flex-row-reverse justify-start md:items-center p-2">

            <div className="banner3-title flex flex-col items-center md:items-start gap-y-3 md:flex-1">

                <p className="text-center md:text-start text-2xl md:text-3xl font-semibold text-zinc-300">
                    From casual vibes to statement pieces, find your perfect fit and wear your personality with pride in every look
                </p>
                
                <button className="btn rounded-md">
                    <Link to="/shop" className="flex items-center gap-x-2">
                        Order now <GiClothes size={24} />
                    </Link>
                </button>

            </div>

            <div className=" h-[200px] flex items-center justify-center md:flex-1">

                <img 
                  src={LOGO} 
                  alt="" 
                  className="banner3-logo h-full" 
                />

            </div>
        
        </div>

    </div>

  )

}
