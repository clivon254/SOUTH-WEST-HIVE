

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useParams } from 'react-router-dom'
import NoProfile from "../assets/profile.png";
import { useSelector } from 'react-redux';
import { FaUserCheck } from 'react-icons/fa';
import { toast } from 'sonner';
import Popular from '../components/Popular';
import PostCard from '../components/PostCard';


export default function WriterPage() {
  
  const {url,token} = useContext(StoreContext)

  const [writer ,setWriter] = useState({})

  const [posts ,setPosts] = useState([])

  const {userId} = useParams()

  const {currentUser} = useSelector(state => state.user)


  //  fetchWriter
  const fetchWriter = async () => {

    try
    {
      const res = await axios.get(url + `/api/user/get-user/${userId}`)

      if(res.data.success)
      {
        setWriter(res.data.rest)
      }
    }
    catch(error)
    {
      console.log(error)
    }

  }

  // fetchPosts
  const fetchPosts = async () => {

    try
    {
      const res = await axios.get(url + `/api/post/get-posts?userId=${userId}`)

      if(res.data.success)
      {
        setPosts(res.data.posts)
      }
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // follower
  const follower = async () => {

    try
    {
       const res = await axios.post(url + `/api/user/follow-writer/${userId}`,{},{headers:{token}})

       if(res.data.success)
        {
           fetchWriter()
        }
    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  const followerIds = currentUser?.followers?.map((f) => f?._id)

  useEffect(() => {

    fetchWriter()

    fetchPosts()

  },[])


  return (

    <section className="section ">

      <div className="w-full lg:h-60 flex flex-col gap-y-5 items-center lg:flex-row lg:justify-around bg-gradient-to-r from-primaryLight via-secondaryLight to-bgLight darkbg-gradient-to-r dark:from-primaryDark dark:via-secondaryDark dark:to-bgDark p-2">

        <img 
          src={writer?.profilePicture || NoProfile }
          alt="" 
          className="w-48 h-48 rounded-full border-4 object-cover border-slate-400 dark:border-slate-600" 
        />

        <div className=" w-full lg:w-[60%] h-full flex flex-col gap-y-5 md:gap-y-8 items-center justify-center">

          <h2 className="title3">{writer?.username}</h2>

          <div className="flex gap-10">

            {/* followers */}
            <div className="flex flex-col items-center">

              <p className="text-2xl font-semibold">{writer?.followers?.length ?? 0}</p>

              <span className="block">Followers</span>

            </div>

            {/* posts */}
            <div className="flex flex-col items-center">

              <p className="text-2xl font-semibold">{posts?.length ?? 0}</p>

              <span className="block">posts</span>

            </div>

          </div>

          {/* follow */}
          {currentUser && (

            <div onClick={() => follower()} className="w-[65%]">
              {followerIds?.includes(currentUser._id) ? 
              (
                <button className="w-full btn rounded-full">
                  Follow
                </button>
              ) 
              : 
              (
                <div className="w-full btn2 flex items-center gap-x-1 justify-center rounded-full border">
                  <span className="">Following</span>
                  <FaUserCheck />
                </div>
              )
            }
              
            </div>

          )}

        </div>

      </div>

      <div className="w-full flex flex-col lg:flex-row gap-20 2xl:gap-20 py-10">
        
        {/* left */}
        <div className="w-full lg:md:w-2/3 space-y-20">

          {posts.length > 0 ? 
            (
              <>
                  {posts.map((post,index) => (

                    <PostCard post={post} key={index}/>

                  ))}
              </>
            ) 
            : 
            (
              <p className="">The writer has no articles yet</p>
            )
          }

        </div>

        {/* right */}
        <div className="w-full lg:w-1/3">

          <Popular />

        </div>

      </div>

    </section>

  )

}
