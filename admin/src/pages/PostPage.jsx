

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from 'axios'
import Error from '../components/Error'
import Loading from '../components/Loading'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// import required modules
import { Navigation } from 'swiper/modules'







export default function PostPage() {
   
  const {url} = useContext(StoreContext)

  const {currentUser} = useSelector(state => state.user)

  const {slug} = useParams()

  const [post ,setPost] = useState(null)

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [formData,setFormData] = useState({
    userId:currentUser?._id
  })

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

  useEffect(() => {

    fetchPost()

  },[slug])

  return (

    <>

      {!loading && !error && (

        <section className="section">

          {/* top */}
          <div className="w-full flex flex-col-reverse md:flex-row gap-2 gap-y- items-center">

              <div className="w-full md:w-1/2 flex flex-col gap-y-8">

                <h1 className="title">{post?.title}</h1>

                <div className="w-full flex items-center">

                  <span className="flex-1 flex flex-col title3 ">

                    <span className="text-xs text-rose-600">category</span> {post?.category}

                  </span>

                  <span className="flex-1 flex flex-col title3 items-center">

                    <span className="text-xs text-rose-500">veiws</span>

                    {post?.veiws?.length}

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
              <div className="w-full md:w-1/2 ">

                <Swiper>

                  {post?.images.map((img,index) => (

                    <SwiperSlide 
                      key={index}
                    >

                      <img 
                        src={img} 
                        alt="" 
                        className="w-full h-auto md:h-[360px] 2xl:h-[460px] rounded object-cover" 
                      />

                    </SwiperSlide>

                  ))}
                </Swiper>


              </div>

          </div>

          {/* bottom */}
          <div className="">

            {/* LEFT */}
            <div className=""></div>

            {/* RIGHT */}
            <div className=""></div>

          </div>

        </section>

      )}

       {loading && !error && (

        <div className="grid place-content-center">

          <div className="mt-20">

            <Loading />

          </div>

        </div>

      )}

      {error && (

        <Error retry={fetchPost}/>

      )}

    </>

  )
  
}
