

import React, { useContext } from 'react'
import Logo from './Logo'
import LOGO from '../assets/LOGO.png'
import { StoreContext } from '../context/store'
import { MdClose, MdDarkMode, MdLightMode, MdMenu, MdShoppingBag, MdShoppingBasket } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice'
import { Avatar, Drawer, DrawerItems, Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { signOutUserSuccess } from '../redux/user/userSlice'
import DashSidebar from './DashSidebar'

export default function Header() {

  const {open,setOpen} = useContext(StoreContext)

  const {theme} = useSelector(state => state.theme)

  const {currentUser} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  // handleSignout  
  const handleSignOut = () => {

    try
    {
        toast.success("You have signed out successfully")

        localStorage.removeItem("token")

        dispatch(signOutUserSuccess())

        navigate("/sign-in")
    }
    catch(error)
    {
        console.log(error.message)
    }

  }

  return (

    <>

        <header className="w-full fixed top-0 z-50  p-4 shadow backdrop-blur-xl">

            <div className="flex items-center justify-between">
                
                {/*  toggle*/}
                <div className="lg:hidden">
                    {
                        open ?
                        <button className="">
                            <MdClose 
                                size={30} 
                                onClick={() => setOpen(false)}
                            />
                        </button>
                        :
                        <button className="">
                            <MdMenu 
                                size={30}
                                onClick={() => setOpen(true)}
                        />
                        </button>
                    }
                </div>

                {/* logo */}
                <div className="flex items-center">

                    <img 
                        src={LOGO} 
                        alt="" 
                        className="hidden md:block h-12 md:h-20  lg:h-24  2xl:h-32 " 
                    />

                    <Logo/>

                </div>

                {/* actions */}
                <div className="flex items-center gap-x-2 md:gap-x-5 md:order-2">

                    {/* themeSwitch */}
                    <div className="hidden md:block">
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

                    {/* cart */}
                    <div className="">

                        <MdShoppingBag size={26}/>

                    </div>

                    {/* dropdown */}
                    <div className="">
                        {currentUser && (

                            <Dropdown
                                inline
                                arrowIcon={false}
                                label={
                                    <Avatar 
                                        alt="user"
                                        img={currentUser?.profilePicture}
                                        rounded
                                    />
                                }
                                className="dark:bg-secondaryDark bg-secondaryLight"
                            >

                                <Dropdown.Header>

                                    <span className="block text-sm">{currentUser?.username}</span>

                                    <span className="block text-sm">{currentUser?.email}</span>
                                    
                                </Dropdown.Header>

                                <Link to="/profile">

                                    <Dropdown.Item>Profile</Dropdown.Item>

                                </Link>

                                <Dropdown.Item className="hover:bg-bgDark"onClick={handleSignOut}>
                                    Sign out
                                </Dropdown.Item>

                            </Dropdown>

                        )}
                    </div>

                </div>

            </div>

        </header>

        <Drawer
            open={open}
            onClose={() => setOpen(false)}
            className=""
        >
            <DrawerItems className="pt-10">
                
                <span className="flex justify-end">

                    <MdClose 
                        size={30}
                        onClick={() => setOpen(false)}
                        className="cursor-pointer"
                    />

                </span>

                <DashSidebar/>

            </DrawerItems>

        </Drawer>

    </>

  )

}
