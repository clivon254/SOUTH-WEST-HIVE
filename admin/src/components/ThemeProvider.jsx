

import React from 'react'
import { useSelector } from 'react-redux'

export default function ThemeProvider({children}) {

  const {theme} = useSelector(state => state.theme)

  return (

    <div className={theme}>

        <div className="bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark font-texting transition-all ease-in-out delay-100">

            {children}
            
        </div>

    </div>

  )

}
