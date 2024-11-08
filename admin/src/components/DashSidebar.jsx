

import { Sidebar } from 'flowbite-react'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { MdAccessibility, MdAccessibilityNew, MdAccessible, MdAddAlarm, MdAddAlert, MdAddAPhoto, MdAddBusiness, MdAirlineSeatIndividualSuite, MdAnalytics, MdCollections, MdCompost, MdDarkMode, MdDashboard, MdFlipCameraIos, MdFoodBank, MdLightMode, MdLogoDev, MdMerge, MdOutlineSwapVert, MdPanorama, MdPodcasts, MdPostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/store'
import { FaUsers } from "react-icons/fa"


export default function DashSidebar() {

  const {theme} = useSelector(state => state.theme)

  const {setOpen} = useContext(StoreContext)

  const dispatch = useDispatch()

  return (

    <Sidebar className="">

        <Sidebar.Items className="bg-bgLight dark:bg-bgDark">

            <Sidebar.ItemGroup className="bg-bgLight dark:bg-bgDark p-3">
                
                <div className="flex flex-col gap-y-2">

                    <Link 
                        to="/"
                        onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/'}
                            ad="div"
                            icon={MdDashboard}
                        >
                            Dashboard
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/analytic"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/analytic'}
                            ad="div"
                            icon={MdAnalytics}
                        >
                            Analytics
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-post"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-post'}
                            ad="div"
                            icon={MdPostAdd}
                        >
                            Add Post
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/posts"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/posts'}
                            ad="div"
                            icon={MdCompost}
                        >
                            Posts
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-food"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-food'}
                            ad="div"
                            icon={MdLogoDev}
                        >
                            Add Food
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/foods"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/foods'}
                            ad="div"
                            icon={MdFoodBank}
                        >
                            Food
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-merch"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-merch'}
                            ad="div"
                            icon={MdMerge}
                        >
                            Add Merch
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/merch"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/merch'}
                            ad="div"
                            icon={MdOutlineSwapVert}
                        >
                            Merch
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-access"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-access'}
                            ad="div"
                            icon={MdAccessibility}
                        >
                            Add Acsess
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/access"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/access'}
                            ad="div"
                            icon={MdCollections}
                        >
                            Access
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-film"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-film'}
                            ad="div"
                            icon={MdAddAPhoto}
                        >
                            Add Film
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/film"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/film'}
                            ad="div"
                            icon={MdFlipCameraIos}
                        >
                            Film
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-reel"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-reel'}
                            ad="div"
                            icon={MdAddBusiness}
                        >
                            Add Reels
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/reels"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/reels'}
                            ad="div"
                            icon={MdAirlineSeatIndividualSuite}
                        >
                            Reels
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/add-podcast"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/add-podcast'}
                            ad="div"
                            icon={MdPanorama }
                        >
                            Add Podcast
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/podcasts"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/podcasts'}
                            ad="div"
                            icon={MdPodcasts}
                        >
                            Podcast
                        </Sidebar.Item>

                    </Link>

                    <Link 
                    to="/users"
                    onClick={() => setOpen(false)}
                    >

                        <Sidebar.Item
                            active={window.location.pathname === '/users'}
                            ad="div"
                            icon={FaUsers}
                        >
                            Users
                        </Sidebar.Item>

                    </Link>

                    <Sidebar.Item className="">

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

                    </Sidebar.Item>

                </div>

            </Sidebar.ItemGroup>

        </Sidebar.Items>

    </Sidebar>

  )

}
