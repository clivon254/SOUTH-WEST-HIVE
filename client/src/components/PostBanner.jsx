


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/store'

export default function PostBanner({post}) {

  const {posts,postLoading,postError} = useContext(StoreContext)

  return (

    <>

        {posts && !postLoading && (

            <div id="hero" className=" relative w-full h-[500px] 2xl:h-[600px] flex">
                    
                <Link 
                    to={`/post/${post?.slug}`}
                    className="w-full"
                >

                    <img 
                        src={post?.images[0]} 
                        alt="Banner" 
                        className="w-full  lg:w-[90%] h-64 md:h-[420px] 2xl:h-[560px] rounded bg-secondaryLight dark:bg-secondaryDark" 
                    />

                </Link>

                <div className="absolute flex flex-col md:right-10 bottom-10 md:bottom-2 w-full md:w-1/2 lg:w-1/3 2xl:w-[480px] bg-white dark:bg-[#05132b] shadow-2xl p-5 rounded-lg gap-3">

                        <Link to={`/post/${post?.slug}`}>

                            <h1 className="font-semibold text-2xl text-black dark:text-white">
                                {post?.title.slice(0, 60) + "....."}
                            </h1>

                        </Link>

                        <div 
                            className="flex-1 overflow-hidden text-gray-600 dark:text-slate-500 text-sm text-justify"
                            dangerouslySetInnerHTML={{ __html: post?.description?.slice(0, 160) + "...." }}
                        />

                        <Link
                            to={`/writer/${post?.userId?._id}`}
                            className="flex gap-3 mt-4 items-center"
                        >
                            <img 
                                src={post?.userId?.profilePicture} 
                                alt="user profile" 
                                className="object-cover w-10 h-10 rounded-full" 
                            />

                            <span className="font-medium text-gray-700 dark:text-slate-500">
                                {post?.userId?.username}
                            </span>

                            <span className="text-gray-500 dark:text-gray-600">
                                {new Date(post?.createdAt).toDateString()}
                            </span>

                        </Link>

                </div>

            </div>

        )}

        {postLoading && !postError && (

            <div id="hero" className=" relative w-full h-[500px] 2xl:h-[600px] flex">
                    
               

                <div 
                    className="w-full  lg:w-[90%] h-64 md:h-[420px] 2xl:h-[560px] rounded pulse" 
                />

               

                <div className="absolute flex flex-col md:right-10 bottom-10 md:bottom-2 w-full md:w-1/2 lg:w-1/3 2xl:w-[480px] bg-white dark:bg-[#05132b] shadow-2xl p-5 rounded-lg gap-3">

                        <span className="h-5 w-full rounded-full pulse"/>

                        <div className="h-32 pulse rounded-lg"/>

                        <div className="flex gap-3 mt-4 items-center">
                            
                            <span className="pulse w-10 h-10 rounded-full" />

                            <span className="h-3 w-16 pulse rounded-full"/>

                            <span className="h-3 w-16 pulse rounded-full"/>
                            
                        </div>

                </div>

            </div>

        )}

    </>
    
  )

}
