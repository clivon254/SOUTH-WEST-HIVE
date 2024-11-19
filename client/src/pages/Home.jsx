

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import Popular from '../components/Popular'
import PostCard from '../components/PostCard'

export default function Home() {

  const {posts} = useContext(StoreContext)

  return (

    <section className="section">

      {/*  banner1*/}
      <div className=""></div>

      {/* posts */}
      <div className="w-full flex flex-col lg:flex-row gap-20 2xl:gap-20">

          {/* left */}
          <div className="w-full lg:w-2/3 space-y-10">

            <div className="flex flex-col gap-y-20 md:gap-y-14">

              {posts?.map((post,index) => (

                  <PostCard key={index} post={post}/>

              ))}
              

            </div>
          
          </div>

          {/* right */}
          <div className="w-full lg:w-1/3">

            <Popular />

          </div>

      </div>

      {/* banner2 */}
      <div className=""></div>

      {/* La Elite */}
      <div className=""></div>

      {/* banner3 */}
      <div className=""></div>

      {/*products */}
      <div className=""></div>

      {/* brands */}
      <div className=""></div>

    </section>

  )

}
