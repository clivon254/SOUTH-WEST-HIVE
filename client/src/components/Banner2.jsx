

import React, { useRef ,useEffect} from 'react'
import chef from "../assets/chefsAtwork.jpeg"
import LOGO from "../assets/LogoLaElite.png"
import { Link } from 'react-router-dom'
import { MdRestaurantMenu } from 'react-icons/md'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

export default function Banner2() {

    const banner2Ref = useRef(null)

    useEffect(() => {
  
      const ctx = gsap.context(() => {
  
        const tl = gsap.timeline({
          defaults:{ease:"power3.out", durartion: 0.6}
        })
  
        tl.from('.banner2-logo',{
          opacity:0,
          y:50,
          scale:0.95,
          duration:0.8,
          delay:0.5,
          stagger:0.15,
          scrollTrigger:{
              trigger: ".banner2-logo", 
              start: "top 80%", 
              toggleActions: "play none none none"
          }
        },
        "-=0.4")
        tl.from('.banner2-title',{
            opacity:0,
            y:50,
            scale:0.95,
            duration:0.8,
            delay:0.5,
            stagger:0.15,
            scrollTrigger:{
                trigger: ".banner2-title", 
                start: "top 80%", 
                toggleActions: "play none none none"
            }
          },
          "-=0.4"
        )
  
      },banner2Ref)
  
      return () => ctx.revert()
  
    },[])

  return (

    <div 
        className="h-[60vh]  w-full " 
        style={{
            backgroundImage:`url(${chef})`,
            backgroundSize: 'cover',
            backgroundPosition:`center`
        }}
        ref={banner2Ref}
    >

        <div className="w-full h-full bg-primaryLight/60 dark:bg-primaryDark/60 flex flex-col-reverse md:flex-row justify-start items-center p-3">

            <div className="banner2-title flex flex-col items-center md:items-start gap-y-2 md:flex-1">

                 <p className=" text-center md:text-start text-2xl md:text-3xl font-semibold text-zinc-300">
                 From our kitchen to your heart, every bite tells a story of flavor, quality, and unforgettable culinary delight
                </p>
                
                <button className="btn rounded-md">
                    <Link to="/la elite" className="flex items-center gap-x-2">
                        Order now <MdRestaurantMenu size={24} />
                    </Link>
                </button>

            </div>

            <div className=" h-[200px] flex items-center justify-center md:flex-1">

                <img 
                  src={LOGO} 
                  alt="" 
                  className="banner2-logo h-full" 
                />

            </div>
        
        </div>

    </div>

  )

}
