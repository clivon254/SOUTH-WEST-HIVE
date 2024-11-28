

import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from "../assets/LOGO.png"
import Logo from './Logo'
import { FaSpotify, FaTiktok } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";



export default function FooterComp() {
    
  return (

    <footer className="z-50 bg-secondaryLight dark:bg-secondaryDark p-4 w-full dark:text-textSecondaryDark ">

        <div className="w-full ">

          {/* top */}
          <div className="flex flex-col sm:flex-row sm:items-start md:items-center gap-y-5 justify-around">

            <div className="w-full sm:w-[35%]">

              <Link to="/" className="flex flex-col items-start sm:items-center">

                <div className="h-20 w-20">

                  <img 
                    src={LOGO} 
                    alt="" 
                    className="h-full w-full" 
                  />

                </div>

                <Logo/>

              </Link>

            </div>

            <div className="w-full sm:w-[60%] flex flex-col sm:flex-row gap-y-5 items-start justify-between ">
              
              {/* socials */}
              <div className="space-y-4">

                <h2 className="text-base font-title font-semibold">Follow us</h2>

                <div className="flex items-center gap-x-3">

                  <a 
                    href="https://www.tiktok.com/@_prideofkaren?_t=8riyiYQpS00&_r=1" 
                    tartget="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaTiktok size={32} />
                  </a>

                  <a 
                    href="https://www.instagram.com/_prideofkaren/profilecard/?igsh=NTZiZXNma2V4OWpp" 
                    tartget="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiInstagram size={32}/>
                  </a>

                  <a 
                    href="https://open.spotify.com/playlist/12kggIDclv97pFf7RuzK0u?si=Bg2WNbrBR1-1IiFWZOErxQ&pi=vayS2sffRXqnm" 
                    tartget="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FaSpotify size={32}/>
                  </a>


                </div>

              </div>

              {/*  important Link*/}
              <div className="space-y-2">

                <h1 className="text-base font-title font-semibold">Useful Links</h1>

                <div className="flex flex-col">

                    <Link to="/contact">
                      Contact us
                    </Link>

                    <Link to="/about">
                      About us
                    </Link>

                    <Link to="/faq">
                      FAQs
                    </Link>

                </div>

              </div>

              {/* privacy */}
              <div className="space-y-2">

                <h1 className="text-base font-title font-semibold">Legal</h1>

                <div className="flex flex-col">

                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      privacy policy
                    </a>

                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      Terms &amp; conditions
                    </a>
                  
                </div>

              </div>

            </div>

          </div>

          <hr className="my-5 text-zinc-" />

          {/* copyright */}
          <div className="">

            <a 
              href="#" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-xs font-semibold"
            >
              &copy; {new Date().getFullYear()} by SIRE TECHNOLOGIES . All rights reserved
            </a>

          </div>

        </div>

    </footer>

  )
}
