

import React, { createContext, useEffect, useState } from 'react'


export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {

  const [token ,setToken] = useState(null)

  const url = "http://localhost:2500"


  useEffect(() => {

    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))
    }

  },[])

  const contextValue = 
  {
    url,
    token,setToken
  }

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )
}
