

import axios from 'axios'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { FaSleigh } from 'react-icons/fa'



export const StoreContext = createContext(null)



export default function StoreContextProvider(props) {

    const [token ,setToken] = useState(localStorage.getItem("token"))

    // const url = "https://south-west-hive-server.onrender.com"

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

    const audioRef = useRef()

    const seekBg = useRef()

    const seekBar = useRef()

    const [track ,setTrack] = useState()


    const [playStatus ,setPlayStatus] = useState(false)

    
    const [time ,setTime] = useState({
      currentTime:{
        hour:(0).toString().padStart(2, '0'),
        second:(0).toString().padStart(2, '0'),
        minute:(0).toString().padStart(2, '0')
      },
      totalTime:{
        hour:(0).toString().padStart(2, '0'),
        second:(0).toString().padStart(2, '0'),
        minute:(0).toString().padStart(2, '0')
      }
    })


    const [stats , setStats] = useState([])

    const [statsLoading , setStatsLoading] = useState(false)

    const [statsError , setStatsError] = useState(false)

    const [days ,setDays] = useState(28)

    const [orders ,setOrders] = useState([])

    const [ordersLoading ,setOrdersLoading] = useState(false)
    
    const [ordersError ,setOrdersError] = useState(false)



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

          setTrack(res.data.podcasts[0])
        }

      }
      catch(error)
      {
        console.log(error.message)

        setPodcastError(true)

        setPodcastLoading(false)
      }

    }


    // fetchStats
    const fetchStats = async () => {

      try
      {

        setStatsLoading(true)

        setStatsError(false)

        const res = await axios.post( url + `/api/post/stats?query=${days}`,{},{headers:{token}})

        if(res.data.success)
        {
          setStatsLoading(false)

          setStats(res.data)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setStatsError(true)

        setStatsLoading(false)
      }

    }

    // fetchOrders
    const fetchOrders = async () => {

      setOrdersLoading(true)

      setOrdersError(false)

      try
      {
        const res = await axios.get(url + "/api/order/get-adminOrders",{headers:{token}})

        if(res.data.success)
        {
          setOrdersLoading(false)

          setOrders(res.data.orders)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setOrdersLoading(false)

        setOrdersError(true)
      }

    }


    // play
    const play = () => {

      audioRef.current.play()

      setPlayStatus(true)

    }

    // pause
    const pause = () => {

      audioRef.current.pause()

      setPlayStatus(false)
    }


    // fetching All 
    useEffect(() => {

      fetchPost()

      fetchPopularContent()

      fetchProducts()

      fetchReels()

      fetchFilms()

      fetchBrand()

      fetchUser()

      fetchPodcast()

      fetchStats()

      fetchOrders()

    },[])


    // playWithId
     const playWithId = async (podcastId) => {

      const podcast = podcasts.find((pod) => pod._id === podcastId)

      await setTrack(podcast)

      await audioRef.current.play()

      setPlayStatus(true)
     }

    // previous
    const previous = () => {

      podcasts.map( async (item,index) => {

        if(track?._id === item._id && index > 0)
        {
          await setTrack(podcasts[index - 1])

          await audioRef.current.play()

          setPlayStatus(true)
        }

      })
    }

    // next
    const next = () => {

      podcasts.map( async (item,index) => {

        if(track?._id === item._id && index < podcasts.length)
        {
          await setTrack(podcasts[index + 1])

          await audioRef.current.play()

          setPlayStatus(true)
        }
        // else
        // {
        //   await setTrack(podcasts[0])

        //   await audioRef.current.play()

        //   setPlayStatus(true)
        // }

      })
    }

    // seekSong
    const seekSong = async (e) => {

      audioRef.current.currentTime = ((e.nativeEvent.offsetX /seekBg.current.offsetWidth) * audioRef.current.duration)

    }



    useEffect(() => {

      if(localStorage.getItem("token"))
      {
        setToken(localStorage.getItem("token"))

        fetchStats()
      }

    },[token])


    useEffect(() => {

      setTimeout(() => {

        audioRef.current.ontimeupdate = () => {
          
          seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100)) + "%"

          setTime({
            currentTime:{
              hour:Math.floor(audioRef.current.currentTime / 3600).toString().padStart(2, '0'),
              minute:Math.floor((audioRef.current.currentTime % 3600) / 60).toString().padStart(2, '0'),
              second:Math.floor(audioRef.current.currentTime % 60).toString().padStart(2, '0')
            },
            totalTime:{
              hour:Math.floor(audioRef.current.duration / 3600).toString().padStart(2, '0'),
              minute:Math.floor((audioRef.current.duration % 3600) / 60).toString().padStart(2, '0'),
              second:Math.floor(audioRef.current.duration % 60).toString().padStart(2, '0')
            }
          })

        }

      },1000)

    },[audioRef])


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
      fetchPodcast,
      stats,setStats,
      statsLoading,setStatsLoading,
      statsError,setStatsError,
      fetchStats,
      audioRef,
      seekBg,
      seekBar,
      track,setTrack,
      playStatus,setPlayStatus,
      time,setTime,
      play,pause,playWithId,next,previous,seekSong,
      setDays,days,
      orders,setOrders,
      ordersLoading, setOrdersLoading,
      ordersError, setOrdersError,
      fetchOrders
    }


  return (

    <StoreContext.Provider value={contextValue}>

        {props.children}

    </StoreContext.Provider>

  )
}
