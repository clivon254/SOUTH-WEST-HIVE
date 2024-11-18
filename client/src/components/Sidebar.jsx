

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {MdLightMode ,MdDarkMode} from "react-icons/md"
import { toggleTheme } from '../redux/theme/themeSlice'


export default function Sidebar() {

  const {NavLinks,setOpen} = useContext(StoreContext)

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
