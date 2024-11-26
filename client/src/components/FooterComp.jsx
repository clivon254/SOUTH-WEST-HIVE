

import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import LOGO from "../assets/LOGO.png"
import Logo from './Logo'


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
              <div className="space-y-2">

                <h2 className="text-base font-title font-semibold">Follow us</h2>

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
