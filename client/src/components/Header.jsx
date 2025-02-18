

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { MdClose, MdMenu } from "react-icons/md"
import Logo from './Logo'
import LOGO from '../assets/LOGO.png'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Avatar, Drawer, Dropdown } from "flowbite-react"
import { signOutUserSuccess } from '../redux/user/userSlice'
import {toast} from "sonner"
import { toggleTheme } from '../redux/theme/themeSlice'
import {MdDarkMode,MdLightMode,MdShoppingBag} from "react-icons/md"
import Sidebar from './Sidebar'



export default function Header() {

  const {open ,setOpen,NavLinks,cartCount,token} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const {theme} = useSelector(state => state.theme)

  const [isSticky ,setIsSticky] = useState(false)

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

   useEffect(() => {

    let prevScrollPosition = 0 ;

    const handleScroll = () => {

      const scrollPosition = window.scrollY ;

      const scrollDirection = scrollPosition - prevScrollPosition

      prevScrollPosition = scrollPosition

      if(scrollDirection < 0 && scrollPosition > 0)
      {
        setIsSticky(true)
      }
      else if(scrollDirection > 0)
      {
        setIsSticky(false)
      }

    }

    window.addEventListener('scroll',handleScroll)

    return () => {

      window.removeEventListener('scroll', handleScroll)
    }

   },[])


  return (
 
    <>

      <header className={`w-full ${isSticky ? "sticky top-0":""} z-50 p-4 shadow backdrop-blur-2xl border-b dark:border-zinc-500`}>

        <div className="flex items-center justify-between">

          {/* toggle */}
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
          <Link to="/">

            <div className="flex items-center">

                <div className="hidden lg:block h-12 w-12 md:h-20 md:w-12 lg:h-24 lg:w-24  2xl:h-32 2xl:w-32">

                  <img 
                      src={LOGO} 
                      alt="" 
                      className="h-full w-full" 
                  />

                 </div>

                <Logo/>

            </div>

          </Link>

          {/* NavLinks */}
          <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 flex-wrap justify-center">

            {NavLinks.map((nav,index) => (

              <NavLink 
                key={index}
                to={`${nav.path}`}
                className={({isActive}) => isActive ? "active-nav-link" : "active-nav"}
              >
                <span className="">{nav.icons}</span> {nav.name}
              </NavLink>

            ))}

          </nav>

          {/* actions */}
          <div className="flex items-center gap-x-2 ">

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

            
            {token && (

              <div className="relative">

                <Link to="/cart">

                  <MdShoppingBag size={32}/>

                  {currentUser && (

                      <span className="absolute dark:bg-secondaryDark bg-secondaryLight h-6 w-6 grid place-content-center rounded-full dark:text-zinc-100 text-zinc-600 -top-3 -right-2">
                        {cartCount || 0}
                      </span>

                  )}

                </Link>

              </div>

             )}

            {/* dropdown */}
            <div className="">
              {currentUser 
                ? 
                (
                  <Dropdown
                    inline
                    arrowIcon={false}
                    className="z-[50]"
                    label={
                      <Avatar
                        alt="user"
                        img={currentUser?.profilePicture}
                        rounded
                      />
                    }
                  >

                    <Dropdown.Header>

                      <span className="block text-sm">{currentUser?.username}</span>

                      <span className="block text-sm">{currentUser?.email}</span>

                    </Dropdown.Header>


                      {currentUser?.accountType === "writer" &&(

                        <>

                          <Link to="/dashboard">

                             <Dropdown.Item>Dashboard</Dropdown.Item>

                          </Link>

                          <Link to="/posts">

                              <Dropdown.Item>My Articles</Dropdown.Item>

                          </Link>

                          <Link to="/add-post">

                              <Dropdown.Item>Add Articles</Dropdown.Item>

                          </Link>

                        </>

                      )}

                      {currentUser?.accountType === "caterer" &&(

                        <>

                           <Link to="/dashboard">

                               <Dropdown.Item>Dashboard</Dropdown.Item>

                          </Link>

                          <Link to="/food">

                              <Dropdown.Item>Food items</Dropdown.Item>

                          </Link>

                          <Link to="/add-food">

                              <Dropdown.Item>Add Food Item</Dropdown.Item>

                          </Link>

                        </>

                      )}

                      {currentUser?.accountType === "salesperson" &&(

                        <>

                          <Link to="/dashboard">

                             <Dropdown.Item>Dashboard</Dropdown.Item>

                          </Link>

                          <Link to="/brand">

                              <Dropdown.Item>Brands</Dropdown.Item>

                          </Link>

                          <Link to="/add-brand">

                              <Dropdown.Item>Add Brand</Dropdown.Item>

                          </Link>

                          <Link to="/merch">

                              <Dropdown.Item>Merchendise</Dropdown.Item>

                          </Link>

                          <Link to="/add-merch">

                              <Dropdown.Item>Add Merchendise</Dropdown.Item>

                          </Link>

                          <Link to="/access">

                              <Dropdown.Item>Accessories</Dropdown.Item>

                          </Link>

                          <Link to="/add-access">

                              <Dropdown.Item>Add Accessories</Dropdown.Item>

                          </Link>

                          <Link to="/purchase-orders">

                              <Dropdown.Item>Purchase orders</Dropdown.Item>

                          </Link>


                        </>

                      )}

                      {currentUser?.accountType === "media" &&(

                        <>

                         <Link to="/dashboard">

                           <Dropdown.Item>Dashboard</Dropdown.Item>

                         </Link>

                          <Link to="/podcast">

                              <Dropdown.Item>Podcast-media</Dropdown.Item>

                          </Link>

                          <Link to="/add-podcast">

                              <Dropdown.Item>Add Podcast</Dropdown.Item>

                          </Link>

                          <Link to="/film">

                              <Dropdown.Item>My Films</Dropdown.Item>

                          </Link>

                          <Link to="/add-film">

                              <Dropdown.Item>Add Film</Dropdown.Item>

                          </Link>

                          <Link to="/reel">

                              <Dropdown.Item>My Reels</Dropdown.Item>

                          </Link>

                          <Link to="/add-reel">

                              <Dropdown.Item>Add Reel</Dropdown.Item>

                          </Link>

                        </>

                      )}

                    <Link to={`/user/${currentUser._id}`}>

                      <Dropdown.Item>Profile</Dropdown.Item>

                    </Link>

                    <Link to="/orders">

                      <Dropdown.Item>Orders</Dropdown.Item>

                    </Link>

                    <Dropdown.Item onClick={handleSignOut}>
                      Sign out
                    </Dropdown.Item>

                  </Dropdown>
                ) 
                : 
                (
                  <Link to="/sign-in">

                    <button className="btn rounded-full">
                      sign in
                    </button>

                  </Link>
                )
              }
            </div>

          </div>

        </div>

      </header>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        className="lg:hidden z-[100] bg-bgLight dark:bg-bgDark overflow-y-scroll"
       >

        <Drawer.Header titleIcon={() => <></>}/>

        <Drawer.Items>

          <Sidebar />

        </Drawer.Items>

      </Drawer>
    
    </>

  )

}
