

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
              <div className="w-full md:w-1/2 relative">

                <Swiper
                  className="mySwiper"
                  navigation={true} 
                  loop={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                  }}
                  modules={[Navigation,Pagination,Autoplay]} 
                  // navigation={{
                  //   prevEl:'.prev',
                  //   nextEl:'.next'
                  // }}
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

                {/* <div className=".prev">
                  <MdChevronLeft size={32}/>
                </div>

                <div className=".next">
                  <MdChevronRight size={32}/>
                </div> */}

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
