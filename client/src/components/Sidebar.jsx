

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {MdLightMode ,MdDarkMode, MdContactSupport, MdArticle, MdAddCard, MdRestaurantMenu, MdRestaurant, MdFoodBank, MdBrandingWatermark, MdPodcasts, MdViewArray, MdFileOpen, MdPictureInPicture, MdPictureAsPdf} from "react-icons/md"
import { toggleTheme } from '../redux/theme/themeSlice'
import { IoFilm } from 'react-icons/io5'
import { FaAcquisitionsIncorporated, FaAddressCard, FaFilm } from 'react-icons/fa'
import { FcAbout } from 'react-icons/fc'
import { SiAbbott } from 'react-icons/si'
import { FcFaq } from "react-icons/fc";
import { GiClothes } from 'react-icons/gi'


export default function Sidebar() {

  const {NavLinks,setOpen} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const dispatch = useDispatch()

  const {theme} = useSelector(state => state.theme)


  return (

    <aside className="pt-10">

        <div className="flex flex-col gap-y-4">

            {NavLinks.map((nav,index) => (

              <NavLink 
                key={index}
                to={`${nav.path}`}
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "active-link" : "active"}
              >
                <span className="">{nav.icons}</span> {nav.name}
              </NavLink>

            ))}

             <NavLink 
                to={`/films`}
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "active-link" : "active"}
              >
                <span className=""><IoFilm/></span> Films
              </NavLink>

              <NavLink 
                to={`/reels`}
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "active-link" : "active"}
              >
                <span className=""><FaFilm/></span> Reels
              </NavLink>

              {currentUser?.accountType === "writer" && (

                <>
                  <NavLink 
                    to={`/posts`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdArticle/></span> My Articles
                  </NavLink>

                  <NavLink 
                    to={`/add-post`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdAddCard/></span> Add Articles
                  </NavLink>

                </>

              )}

              {currentUser?.accountType === "caterer" && (

                <>

                  <NavLink 
                    to={`/food`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdRestaurant size={24}/></span> Food Items
                  </NavLink>

                  <NavLink 
                    to={`/add-food`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdFoodBank/></span> Add Food Items
                  </NavLink>

                </>

              )}

              {currentUser?.accountType === "salesperson" && (

                <>

                  {/* brand */}
                  <NavLink 
                    to={`/brand`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdBrandingWatermark size={24}/></span> Brands
                  </NavLink>

                  {/* add brand */}
                  <NavLink 
                    to={`/add-brand`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdFoodBank/></span> Add Brands
                  </NavLink>

                  {/* merch */}
                  <NavLink 
                    to={`/merch`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><GiClothes size={24}/></span> Merchendise
                  </NavLink>
                  
                  {/* add-merch */}
                  <NavLink 
                    to={`/add-merch`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdFoodBank/></span> Add Merchendise
                  </NavLink>

                  {/* access */}
                  <NavLink 
                    to={`/access`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><FaAcquisitionsIncorporated size={24}/></span> Accessories
                  </NavLink>

                  {/* add-access */}
                  <NavLink 
                    to={`/add-access`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><FaAddressCard/></span> Add Accessories
                  </NavLink>


                </>

              )}

              {currentUser?.accountType === "media" && (

                <>

                  <NavLink 
                    to={`/podcast`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdPodcasts size={24}/></span> Podcast-media
                  </NavLink>

                  <NavLink 
                    to={`/add-podcast`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdFoodBank size={24}/></span> Add Podcast
                  </NavLink>


                  <NavLink 
                    to={`/film`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdFileOpen size={24}/></span> My Films
                  </NavLink>

                  <NavLink 
                    to={`/add-film`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdViewArray/></span> Add Films
                  </NavLink>


                  <NavLink 
                    to={`/reel`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdPictureInPicture size={24}/></span> My Reels 
                  </NavLink>

                  <NavLink 
                    to={`/add-reel`}
                    onClick={() => setOpen(false)}
                    className={({isActive}) => isActive ? "active-link" : "active"}
                  >
                     <span className=""><MdPictureAsPdf/></span> Add Reels
                  </NavLink>

                </>

              )}

              <NavLink 
                to={`/contact`}
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "active-link" : "active"}
              >
                <span className=""><SiAbbott/></span> Contact us
              </NavLink>

              <NavLink 
                to={`/about`}
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "active-link" : "active"}
              >
                <span className=""><MdContactSupport/></span> About us
              </NavLink>

              <NavLink 
                to={`/faq`}
                onClick={() => setOpen(false)}
                className={({isActive}) => isActive ? "active-link" : "active"}
              >
                <span className=""><FcFaq /></span> FAQs
              </NavLink>

            {/* themeSwitch */}
            <div className="ml-10">
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

    </aside>

  )

}
