

import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { MdAccessibility, MdAccessibilityNew, MdAccessible, MdAddAlarm, MdAddAlert, MdAddAPhoto, MdAddBusiness, MdAirlineSeatIndividualSuite, MdAnalytics, MdBarcodeReader, MdCollections, MdCompost, MdDarkMode, MdDashboard, MdFlipCameraIos, MdFoodBank, MdLightMode, MdLogoDev, MdMerge, MdOutlinePodcasts, MdOutlineSwapVert, MdPanorama, MdPodcasts, MdPostAdd } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { FaBlog, FaFilm, FaTradeFederation, FaUsers } from "react-icons/fa"
import { DiGoogleAnalytics } from "react-icons/di";
import { FaBlogger } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiLoincloth , GiClothes ,GiAccordion} from "react-icons/gi";
import { SiMicrosoftaccess, SiPodcastindex } from "react-icons/si";
import { BsCameraReelsFill } from "react-icons/bs";
import { FcFilmReel } from "react-icons/fc";
import { SiBrandfolder } from "react-icons/si";
import { TbBrandBooking } from "react-icons/tb";


export default function DashSidebar() {

  const {theme} = useSelector(state => state.theme)

  const {setOpen} = useContext(StoreContext)

  const dispatch = useDispatch()

  return (

    <>

        <div className="pt-10 border-r border-zinc-700 px-3 overflow-y-scroll">

            <div className="flex flex-col gap-y-3">

                <NavLink 
                    to="/"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <MdDashboard /> </span> Dashboard
                </NavLink>

                <NavLink 
                    to="/analytic"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <DiGoogleAnalytics /> </span> Analytic
                </NavLink>

                <NavLink 
                    to="/add-post"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <MdPostAdd /> </span> Add Posts
                </NavLink>

                <NavLink 
                    to="/posts"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <FaBlogger /> </span> Posts
                </NavLink>

                <NavLink 
                    to="/add-food"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <FaBowlFood /> </span> Add Food
                </NavLink>


                <NavLink 
                    to="/foods"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <MdDashboard /> </span> Foods
                </NavLink>

                <NavLink 
                    to="/add-merch"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <GiLoincloth /> </span> Add Merchendise
                </NavLink>

                <NavLink 
                    to="/merch"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <GiClothes /> </span> Merchndise
                </NavLink>

                <NavLink 
                    to="/add-access"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <GiAccordion /> </span> Add Accessories
                </NavLink>


                <NavLink 
                    to="/access"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <SiMicrosoftaccess /> </span> Accessories
                </NavLink>

                <NavLink 
                    to="/add-film"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <BsCameraReelsFill /> </span> Add Film
                </NavLink>

                <NavLink 
                    to="/film"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                >
                     <span className=""> <BsCameraReelsFill/> </span> Film
                </NavLink>

                <NavLink 
                    to="/add-reel"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <FcFilmReel /> </span> Add Reel
                </NavLink>

                <NavLink 
                    to="/reels"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <FcFilmReel/> </span> Reels
                </NavLink>


                <NavLink 
                    to="/add-brand"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <SiBrandfolder /> </span> Add Brand
                </NavLink>

                <NavLink 
                    to="/brand"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <TbBrandBooking /> </span> Brand
                </NavLink>

                <NavLink 
                    to="/add-podcast"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <MdOutlinePodcasts /> </span> Add Podcast
                </NavLink>

                <NavLink 
                    to="/podcast"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <SiPodcastindex/> </span> Podcast
                </NavLink>

                <NavLink 
                    to="/users"
                    className={({isActive}) => isActive ? "active-link" : "active"}
                    onClick={() => setOpen(false)}
                >
                     <span className=""> <FaUsers/> </span> users
                </NavLink>

                <div className="md:hidden">
                    {
                        theme === "light" ?
                        <button 
                            onClick={() => dispatch(toggleTheme())}
                            className="h-7 w-7 grid place-content-center border border-gray-500 dark:border-gray-200 rounded-full"
                        >
                            <MdDarkMode />
                        </button>
                        :
                        <button 
                            onClick={() => dispatch(toggleTheme())}
                            className="h-7 w-7 grid place-content-center border border-gray-500 dark:border-gray-200 rounded-full"
                        >
                            <MdLightMode/>
                        </button>
                    }
                 </div>


            </div>

        </div>

    </>

  )

}
