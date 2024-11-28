

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from 'axios'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { MdArrowRight, MdChevronLeft, MdChevronRight } from "react-icons/md"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import {  Autoplay,Navigation ,Pagination} from 'swiper/modules';
import Popular from '../components/Popular'
import CommentSection from '../components/CommentSection'
import { toast } from 'sonner'
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";



export default function PostPage() {
   
  const {url,token} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const {slug} = useParams()


  const [post ,setPost] = useState(null)

  const [user ,setUser] = useState(null)

  const [loading ,setLoading] = useState(false)

  const [saved ,setSaved] = useState(false)

  const [error ,setError] = useState(null)

  const [formData,setFormData] = useState({
    userId:currentUser?._id
    
  })

  //  fetchWriter
  const fetchUser = async () => {

    try
    {
      const res = await axios.get(url + `/api/user/get-user/${currentUser._id}`)

      if(res.data.success)
      {
        setUser(res.data.rest)
      }
    }
    catch(error)
    {
      console.log(error)
    }

  }

  // fetchPost
  const fetchPost = async () => {

    try
    {
      setLoading(true)

      setError(false)

      const res = await axios.post(url + `/api/post/get-post/${slug}`,formData)

      if(res.data.success)
      {
        setPost(res.data.post)

        setLoading(false)

        setError(false)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setError(true)
    }

  }

  const savedPostId = user?.savedPost?.map((user) => user?._id)

  // save Post
  const savePost = async () => {
    

    try
    {
      const res = await axios.post(url +`/api/post/save-post/${post._id}`,{},{headers:{token}})

      if(res.data.success)
      {
        setSaved(!saved)

        fetchUser()

        toast.success(res.data.message)
      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  useEffect(() => {

    fetchPost()

    fetchUser()

  },[slug])


  return (

    <>

      {!loading && !error && (

        <section className="section">

          {/* top */}
          <div className="w-full flex flex-col-reverse md:flex-row gap-x-10 gap-y-5 items-center">

              {/* words */}
              <div className="w-full md:w-1/2 flex flex-col gap-y-8">

                <h1 className="title">{post?.title}</h1>

                <div className="w-full flex items-center justify-between">

                  <span className=" flex flex-col title3 ">

                    <span className="text-xs text-rose-600">category</span> {post?.category}

                  </span>

                  <span className="flex flex-col title3 items-center">

                    <span className="text-xs text-rose-500">veiws</span>

                    {post?.veiws?.length}

                  </span>

                  <span onClick={() => savePost()} className="cursor-pointer">

                     <FaBookmark className={`${savedPostId?.includes(post?._id) ? "text-primaryLight dark:text-red-500 " : "text-zinc-500 dark:text-zinc-200"}`} size={32}/>

                  </span>

                </div>

                <Link to={`/writer/post/${post?.userId?._id}`} className="flex gap-3">

                  <img 
                    src={post?.userId?.profilePicture} 
                    alt={post?.userId?.username}
                    className="object-cover w-12 h-12 rounded-full" 
                  />

                  <div className="">

                    <p className="">
                      {post?.userId?.username}
                    </p>

                    <span className="">
                      {new Date(post?.createdAt).toDateString()}
                    </span>

                  </div>
                
                </Link>

              </div>

              {/* img */}
              <div className="w-full md:w-1/2 relative text-black dark:text-white ">

                <Swiper
                  className="mySwiper"
                  // navigation={true} 
                  // loop={true}
                  pagination={{
                    type: 'fraction',
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  modules={[Navigation,Pagination,Autoplay]} 
                  navigation={{
                    prevEl:'.prev',
                    nextEl:'.next'
                  }}
                >

                  {post?.images.map((img,index) => (

                    <SwiperSlide 
                      key={index}
                    >

                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-[300px] md:h-[360px] 2xl:h-[460px] rounded object-cover" 
                      />

                    </SwiperSlide>

                  ))}

                </Swiper>

                <div className="prev absolute top-1/2 -left-3 z-40 h-10 w-10 bg-secondaryLight dark:bg-secondaryDark rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronLeft size={32} className="text-white"/>
                </div>

                <div className="next absolute top-1/2 -right-3 z-40 h-10 w-10 bg-secondaryLight dark:bg-secondaryDark rounded-full flex justify-center items-center cursor-pointer">
                  <MdChevronRight size={32} className="text-white"/>
                </div>

              </div>

          </div>

          {/* bottom */}
          <div className="w-full flex flex-col md:flex-row gap-y-12 gap-x-10 2xl:gap-x-28 mt-10">

            {/* LEFT */}
            <div className="w-full md:w-2/3 flex flex-col gap-y-10">
                  
              <div className="w-full">

                <div className="flex justify-between p-3 max-w-2xl mx-auto text-xs">

                  <span className="">
                    {new Date(post?.createdAt).toLocaleDateString()}
                  </span>

                  <span className="italic">
                    {(post?.description?.length/1000).toFixed(0)} mins read
                  </span>

                </div>

                <div 
                  className="p-3 max-w-2xl mx-auto w-full post-content"
                  dangerouslySetInnerHTML={{__html:post?.description}}
                />

              </div>

              <CommentSection postId={post?._id} />

            </div>

            {/* RIGHT */}
            <div className="w-full md:w-1/3 p-2">

              <Popular/>

            </div>

          </div>

        </section>

      )}

      {loading && !error && (
       <>

        <div className="grid place-content-center">

          <div className="mt-20">

            <Loading />

          </div>

        </div>

        </>

      )}

      {error && (

        <Error retry={fetchPost}/>

      )}

    </>

  )
  
}
