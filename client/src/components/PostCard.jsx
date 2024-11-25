

import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from "react-icons/ai"


export default function PostCard({post}) {

  return (

    <div
        className="w-full flex flex-col gap-8 item-center md:flex-row"
    >

        <Link
            to={`/post/${post?.slug}`}
            className="w-full h-auto md:h-64 md:w-1/2"
        >

            <img 
              src={post?.images[0]}
              alt={post?.title}
              className="object-cover w-full h-[300px] md:h-full rounded-md"
            />

        </Link>

        <div className="w-full md:w-1/2 flex flex-col gap-y-3">

            <div className="flex items-center gap-2 text-center">

                <span className="text-sm">
                    {new Date(post?.createdAt).toDateString()}
                </span>

                <span className="dark:text-textSecondaryDark font-semibold">
                    {post?.category}
                </span>

            </div>

            <h6 className="text-xl 2xl:text-3xl font-semibold text-black dark:text-white">
                {post?.title}
            </h6>

            <div 
                className="flex-1 overflow-hidden text-zinc-600 dark:text-zinc-100 text-justify"
                dangerouslySetInnerHTML={{__html:post?.description?.slice(0, 160) + "....."}}
            />

            <Link
                to={`/post/${post?.slug}`}
                className="flex items-center gap-2 text-black dark:text-white"
            >
                <span className="underline">Read More</span>

                <AiOutlineArrowRight />

            </Link>

        </div>

    </div>

  )
}
