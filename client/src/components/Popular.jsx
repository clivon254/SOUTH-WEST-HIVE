

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { Link } from 'react-router-dom'

export default function Popular() {

  const {popularArticles,popularWriters,popularLoading} = useContext(StoreContext)

  const [popular ,setPopular] = useState([{},{},{},{},{}])

  return (

    <>

        {!popularLoading && (

            <div className="flex flex-col gap-y-12">

                {/* post */}
                <div className=" space-y-3">

                    <h2 className="title3">Popular Articles</h2>

                    <div className="">

                        {popularArticles?.map((post ,index) => (

                                <div key={index} className="flex gap-2 item-center">

                                    <img 
                                        src={post?.images[0]}
                                        alt="post"
                                        className="w-12 h-12 rounded-full " 
                                    />

                                    <div className="w-full flex flex-col gap-1">

                                        <span className="w-fit text-textSecondaryLight dark:text-textSecondaryDark rounded-full px-2 py-0.5 text-xs 2xl:text-sm font-bold">
                                            {post.category}
                                        </span>

                                        <Link 
                                            to={`/post/${post?.slug}`}
                                            className="font-semibold"
                                        >
                                            {post?.title}
                                        </Link>

                                        <div className="flex gap-2 text-sm">

                                            {/* <span className="">
                                                {post?.userId?.username}
                                            </span> */}

                                            <span className="">
                                                {new Date(post?.createdAt).toDateString()}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                        ))}

                    </div>

                </div>

                {/* writers */}
                <div className="space-y-3">

                    <h2 className="title3">Popular Writers</h2>

                    <div className="space-y-2">

                        {popularWriters?.map((writer,index) => (

                            <Link
                                to={`/writer/${writer?._id}`}
                                key={index}
                                className="flex gap-2 items-center"
                            >

                                <img 
                                    src={writer?.profilePicture} 
                                    alt={writer?.username} 
                                    className="w-12 h-12 rounded-full object-cover" 
                                />

                                <div className="flex flex-col gap-1 ">

                                    <span className="font-semibold">
                                        {writer?.username}
                                    </span>

                                    <span className="">
                                        {writer?.followers} <span className="">Followers</span>
                                    </span>

                                </div>

                            </Link>

                        ))}

                    </div>
                    
                </div>

            </div>

        )}

        {popularLoading && (

            <div className="flex flex-col gap-y-12">

                {/* post */}
                <div className=" space-y-3">

                    <h2 className="title3">Popular Articles</h2>

                    <div className="space-y-2">

                    {popular?.map((post ,index) => (

<div key={index} className="flex gap-3 items-center animate-pulse">

    <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600"/>

    <div className="w-full flex flex-col gap-2">

        <span className="h-2 w-6 rounded-md bg-zinc-300 dark:bg-zinc-600"/>
        
        <span className="h-2 w-20 rounded-md bg-zinc-300 dark:bg-zinc-600"/>

        <span className="h-2 w-20 rounded-md bg-zinc-300 dark:bg-zinc-600"/>

    </div>

</div>

                     ))}

                    </div>

                </div>

                {/* writers */}
                <div className="space-y-3">

                    <h2 className="title3">Popular Writers</h2>

                    <div className="w-full space-y-2">

                        {popular?.map((post ,index) => (

                            <div key={index} className="flex gap-3 items-center animate-pulse">

                                <div className="h-10 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600"/>

                                <div className="w-full flex flex-col gap-2">

                                    <span className="h-2 w-6 rounded-md bg-zinc-300 dark:bg-zinc-600"/>
                                    
                                    <span className="h-2 w-20 rounded-md bg-zinc-300 dark:bg-zinc-600"/>

                                    <span className="h-2 w-20 rounded-md bg-zinc-300 dark:bg-zinc-600"/>

                                </div>

                            </div>

                        ))}

                    </div>
                    
                </div>

            </div>

        )}

    </>

  )
}
