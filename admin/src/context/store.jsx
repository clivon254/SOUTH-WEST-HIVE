

import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { FaSleigh } from 'react-icons/fa'


export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {

    const [token ,setToken] = useState(null)

    const url = "http://localhost:2500"

    const [open,setOpen] = useState(false)

    const [posts ,setPosts] = useState([])

    const [postLoading , setPostLoading] = useState(false)

    const [postError,setPostError] = useState(false)

    const [popularArticles , setPopularArticles] = useState([])

    const [popularWriters, setPopularWriters] = useState([])

    const [popularLoading,setPopularLoading] = useState(false)

    const [products ,setProducts] = useState([])


    // fetchPost
    const fetchPost = async () => {

      try
      {

        setPostLoading(true)

        setPostError(false)

        const res = await axios.get(url + "/api/post/get-posts")

        if(res.data.success)
        {

          setPostLoading(false)

          setPostError(false)

          setPosts(res.data.posts)
        }

      }
      catch(error)
      {
        console.log(error.message)
        
        setPostError(true)
      }

    }

    // fetchPopular content
    const fetchPopularContent = async () => {

      try
      {
        setPopularLoading(true)

        const res = await axios.post(url + "/api/post/popular-content")

        if(res.data.success)
        {
          setPopularLoading(false)

          setPopularArticles(res.data.posts)

          setPopularWriters(res.data.writers)
        }
      }
      catch(error)
      {
        console.log(error.message)

        setPopularLoading(false)
      }

    }


    useEffect(() => {

      fetchPost()

      fetchPopularContent()

    },[])

    useEffect(() => {

      if(localStorage.getItem("token"))
      {
        setToken(localStorage.getItem("token"))
      }

    },[])

    const contextValue = 
    {
      url,
      token,setToken,
      open,setOpen,
      postLoading,setPostLoading,
      postError,setPostError,
      posts,setPosts,
      fetchPost,
      popularArticles,setPopularArticles,
      popularWriters,setPopularWriters,
      popularLoading,setPopularLoading,
      fetchPopularContent
    }

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )
}
