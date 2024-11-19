

import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from "../assets/LOGO.png"
import Logo from './Logo'


export default function FooterComp() {
    
  return (

    <footer className=" bg-secondaryLight dark:bg-secondaryDark p-4 w-full dark:text-textSecondaryDark ">

        <div className="w-full">

          {/* top */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-y-5 justify-around">

            <div className="">

              <Link to="/" className="flex flex-col items-start sm:items-center">

                <img 
                  src={LOGO} 
                  alt="" 
                  className="h-20" 
                />

                <Logo/>

              </Link>

            </div>

            <div className="w-full sm:w-[50%] flex items-start justify-between md:justify-around">
              
              {/* about */}
              <div className="space-y-5">

                <h2 className="text-base font-title font-semibold">About</h2>

                <div className="flex flex-col">

                  <a 
                    href="#" 
                    tartget="_blank" 
                    rel="noopener noreferrer"
                  >
                    Get to know us
                  </a>

                </div>

              </div>

              {/*  social media*/}
              <div className="space-y-5">

                <h1 className="text-base font-title font-semibold">Follow us</h1>

                <div className="flex flex-col">

                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      instagram
                    </a>

                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      tiktok
                    </a>

                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      facebook
                    </a>

                    <a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className=""
                    >
                      what's app
                    </a>

                </div>

              </div>

              {/* privacy */}
              <div className="space-y-5">

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
