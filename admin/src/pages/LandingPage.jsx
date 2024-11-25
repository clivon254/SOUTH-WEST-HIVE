

import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import {MdLightMode,MdDarkMode,MdArrowForward} from "react-icons/md"
import { toggleTheme } from '../redux/theme/themeSlice'
import {Link} from "react-router-dom"
import {gsap} from "gsap"
import {useGSAP} from "@gsap/react"
import Logo from '../components/Logo'
import LOGO from "../assets/LOGO.png"


export default function LandingPage() {

  const {theme} = useSelector(state => state.theme)

  const dispatch = useDispatch()

  useGSAP(() => {

    gsap.from('.logo',{
        opacity:0,
        y:-50,
        duration:0.8,
        stagger:1.5,
        ease:"power2.inOut",
        delay:0.5
    })

    gsap.from('.subtitle',{
        opacity:0,
        y:50,
        duration:0.8,
        stagger:1.5,
        ease:"power2.inOut",
        delay:0.5
    })

    gsap.from('.titling',{
        opacity:0,
        y:50,
        duration:0.8,
        stagger:1.5,
        ease:"power2.inOut",
        delay:0.6
    })

    gsap.from('.words',{
        opacity:0,
        y:50,
        duration:0.8,
        stagger:1.5,
        ease:"power2.inOut",
        delay:0.7
    })

    gsap.from('.graph',{
        opacity:0,
        y:50,
        duration:0.8,
        stagger:1.5,
        ease:"power2.inOut",
        delay:1
    })

  },[])

  return (

    <div 
        className="
                h-screen relative p-2
                bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primaryLight via-bgLight to-secondaryLight
                dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-primaryDark dark:via-bgDark dark:to-secondaryDark
                flex flex-col items-center justify-center
        "
    >

        <span 
            onClick={() => dispatch(toggleTheme())}
            className="absolute top-2 right-2 cursor-pointer h-10 w-10 rounded-full border border-zinc-700 dark:border-zinc-300 flex justify-center items-center"
        >
            {theme === "light" ? <MdLightMode/> : <MdDarkMode/> }
        </span>

        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-y-10 2xl:-mt-20">

            <div className="logo flex items-center">

                <div className="h-24 w-24">

                    <img src={LOGO} alt="" className="h-full w-full" />

                </div>

                <Logo/>

            </div>
            
            {/* logo */}
            <span 
                className="hidden subtitle sm:flex items-center gap-1 py-1 px-3 border rounded-full text-sm md:text-base  border-zinc-600 dark:border-zinc-200 "
            >
                Unleash Your words ,and share with others {"  "}
                <Link to="/sign-in" className="flex items-center">
                    Join Now <MdArrowForward size={24}/>
                </Link>
            </span>

            <h1 className="titling text-4xl 2xl:text-6xl text-center font-title font-bold">
                Join Our Community of Passionate Writers!
            </h1>

            <span className="words text-center text-base md:text-[18px] xl:text-2xl">
                 Welcome back! Oversee e-commerce, craft articles, launch podcasts, premiere films, and deliver reels. Empower your vision and make your platform thrive
            </span>

            <div className="graph items-center mt-6">

                <Link to="/sign-in" className="flex gap-6  items-center btn rounded-full text-xl">

                    <button className="">
                        Get Started
                    </button>

                    <span className="">
                        <MdArrowForward size={24}/>
                    </span>
                
                </Link>

            </div>

        </div>

    </div>

  )
}
