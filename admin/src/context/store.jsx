

import axios from 'axios'
import { set } from 'mongoose'
import React, { createContext, useEffect, useState } from 'react'
import { FaSleigh } from 'react-icons/fa'


export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {

    const [token ,setToken] = useState(localStorage.getItem("token"))

    const url = "http://localhost:2500"

    const [open,setOpen] = useState(false)

    const [posts ,setPosts] = useState([])

    const [postLoading , setPostLoading] = useState(false)

    const [postError,setPostError] = useState(false)

    const [popularArticles , setPopularArticles] = useState([])

    const [popularWriters, setPopularWriters] = useState([])

    const [popularLoading,setPopularLoading] = useState(false)

    const [products ,setProducts] = useState([])

    const [productsLoading ,setProductsLoading] = useState(false)

    const [productsError ,setProductsError] = useState(false)

    const [reels ,setReels] = useState([])

    const [reelLoading ,setReelLoading] = useState(false)

    const [reelError ,setReelError] = useState(false)

    const [films ,setFilms] = useState([])

    const [filmLoading ,setFilmLoading] = useState(false)

    const [filmError ,setFilmError] = useState(false)

    const [brands ,setBrands] = useState([])

    const [brandLoading , setBrandLoading] = useState(false)

    const [brandError ,setBrandError] = useState(false)

    const [users ,setUsers] = useState([])

    const [userLoading ,setUserLoading] = useState(false)

    const [userError ,setUserError] = useState(false)

    const [podcasts ,setPodcasts] = useState([])

    const [podcastLoading ,setPodcastLoading] = useState(false)

    const [podcastError ,setPodcastError] = useState(false)




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

    // fetchProducts
    const fetchProducts = async () => {

      try
      {

        setProductsLoading(true)

        setProductsError(false)
        
        const res = await axios.get(url + "/api/product/get-products")

        if(res.data.success)
        {

          setProductsLoading(false)

          setProducts(res.data.products)
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

    // fetchReel
    const fetchReels = async () => {

      try
      {
        setReelLoading(true)

        setReelLoading(false)

        const res = await axios.get(url + "/api/reel/get-reels")

        if(res.data.success)
        {
          setReelLoading(false)

          setReels(res.data.reels)
        }
      }
      catch(error)
      {
        console.log(error.message)

        setReelError(true)
      }

    }

    // fetchFilm
    const fetchFilms = async () => {

      try
      {
        setFilmLoading(true)

        setFilmError(false)

        const res = await axios.get( url + "/api/film/get-films")

        if(res.data.success)
        {
          setFilmLoading(false)

          setFilms(res.data.shortFilms)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setFilmLoading(false)

        setFilmError(true)
      }

    }

    // fetchBrand
    const fetchBrand = async () => {

      try
      {
        setBrandLoading(true)

        setBrandError(false)

        const res = await axios.get(url + "/api/brand/get-brands")

        if(res.data.success)
        {
          setBrandLoading(false)

          setBrands(res.data.brands)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setBrandError(true)

        setBrandLoading(true)
      }

    }

    //fetchUsers
    const fetchUser = async () => {

      try
      {
        setUserLoading(true)

        setUserError(false)

        const res = await axios.get(url + "/api/user/get-users",{headers:{token}})

        if(res.data.success)
        {
          setUserLoading(false)

          setUsers(res.data.usersWithoutPassword)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setUserLoading(false)

        setUserError(true)
      }

    }


    // fetchPodcast
    const fetchPodcast = async () => {

      try
      {
        setPodcastLoading(true)

        setPodcastError(false)

        const res = await axios.get(url + "/api/podcast/get-podcasts")

        if(res.data.success)
        {
          setPodcastLoading(false)

          setPodcasts(res.data.podcasts)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setPodcastError(true)

        setPodcastLoading(false)
      }

    }

    
    useEffect(() => {

      fetchPost()

      fetchPopularContent()

      fetchProducts()

      fetchReels()

      fetchFilms()

      fetchBrand()

      fetchUser()

      fetchPodcast()

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
      fetchPopularContent,
      products,setProducts,
      productsLoading,setProductsLoading,
      productsError,setProductsError,
      fetchProducts,
      reels,setReels,
      reelLoading,setReelLoading,
      reelError,setReelError,
      fetchReels,
      films,setFilms,
      filmLoading,setFilmLoading,
      filmError,setFilmError,
      fetchFilms,
      brands,setBrands,
      brandLoading,setBrandLoading,
      brandError,setBrandError,
      fetchBrand,
      users,setUsers,
      userLoading,setUserLoading,
      userError,setUserError,
      fetchUser,
      podcasts,setPodcasts,
      podcastLoading,setPodcastLoading,
      podcastError,setPodcastError,
      fetchPodcast
    }

  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )
}
