

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { MdSearch } from 'react-icons/md'
import PostCard from '../components/PostCard'
import Error from '../components/Error'
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)



export default function Articles() {

  const {posts,postLoading,postError,fetchPost} = useContext(StoreContext)

  const [loader ,setLoader] = useState([{},{},{},])

  const [searchPost ,setSearchPost] = useState("")

  const [showFilter ,setShowFilter] = useState(false)

  const [filteredPosts ,setFilteredPosts] = useState([])

  const [category ,setCategory] = useState([])

  const [sortType ,setSortType] = useState('relevant')



  const toggleCategory = (e) => {

    if(category.includes(e.target.value))
    {
        setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else
    {
      setCategory(prev => [...prev,e.target.value])
    }

  }


  // appply filter
  const applyFilter = () => {

    let productsCopy = posts.slice()

    if(searchPost)
    {
      productsCopy = productsCopy.filter(item => item.title.toLowerCase().includes(searchPost.toLowerCase()))
    }


    if(category.length > 0)
    {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    setFilteredPosts(productsCopy)

  }


  // sort Product
  const sortPosts = () => {

    let fpCopy = filteredPosts.slice()

    switch(sortType)
      {
        case 'low-high':
          setFilteredPosts(fpCopy.sort((a,b) => (a.createdAt - b.createdAt)))
          break;

        case 'high-low':
          setFilteredPosts(fpCopy.sort((a,b) => (b.createdAt - a.createdAt)))
          break;

        default:
          applyFilter()
          break;
    }

  }


  useEffect(() => {

    setFilteredPosts(posts)

  },posts)


  useEffect(() => {

    applyFilter()

  },[category,searchPost])


  useEffect(() => {

     sortPosts()

  },[sortType])


  useGSAP(() => {

    // title
    gsap.from("#title",{
      opacity:0,
      y:-50,
      duration:0.5,
      ease:"power3.out",
      stagger:0.3,
      delay:0.9
    })

    // post card
    gsap.from(".post-card", {
      opacity: 0,
      x: 50, // Start from x: -50
      stagger: 0.3,
      duration: 0.5,
      delay:0.8,
      ease: "power3.out",
    //   scrollTrigger: {
    //     trigger: "#posts", 
    //     start: "top 80%", 
    //     toggleActions: "play none none none"
    //   }
    });

  },[])



  return (

    <>
    
    {!postError && (

        <section className="section space-y-5">

          {/* search bar */}
          <div className=" text-center">

            {/* searchbar */}
            <div className="search-bar">

              <input 
                type="text" 
                className="search-input" 
                value={searchPost}
                onChange={(e) => setSearchPost(e.target.value)}
              />

              <MdSearch  size={32}/>

            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-10">

            {/* filter options */}
            <div className="space-y-3">

              <h2 
                className="cursor-pointer title2"
                onClick={() => setShowFilter(!showFilter)}
              >
                FILTERS 
              </h2>

              {/* category */}
              <div className={`space-y-4 border border-zinc-500 dark:border-zinc-300 rounded-md p-3 ${showFilter ? "": "hidden sm:block"}`}>

                <h3 className="title3">CATEGORIES</h3>

                <div className="flex flex-col gap-y-3">

                  {/* entertainment */}
                  <div className="flex items-center gap-x-2">

                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded" 
                      value={'Entertainment'}
                      onChange={toggleCategory}
                    />

                    <label className="label">Entertainment</label>

                  </div>

                  {/* Education */}
                  <div className="flex items-center gap-x-2">

                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded" 
                      value={'Education'}
                      onChange={toggleCategory}
                    />

                    <label className="label">Education</label>

                  </div>

                  {/* Fashion*/}
                  <div className="flex items-center gap-x-2">

                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded" 
                      value={'Fashion'}
                      onChange={toggleCategory}
                    />

                    <label className="label">Fashion</label>

                  </div>

                  {/* Sports*/}
                  <div className="flex items-center gap-x-2">

                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded" 
                      value={'Sports'}
                      onChange={toggleCategory}
                    />

                    <label className="label">Sports</label>

                  </div>

                </div>

              </div>

            </div>

            {/* right side */}
            <div className="flex-1 space-y-5">

              {/* header */}
              <div className="flex items-center justify-between ">

                <h2 className="title3">All Articles</h2>

                <select 
                  className="input"
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="relevant" >Sort by: Relevant</option>

                  <option value="low-high" >Sort by: Latest</option>

                  <option value="high-low" >Sort by: Oldet</option>

                </select>

              </div>

              {/* post map */}
              <div className="">

                  {posts && !postLoading && (

                    <div > 

                        {filteredPosts.length > 0 ? (

                          <div className="grid grid-cols-1 gap-y-10 gap-x-5 2xl:grid-cols-2">

                            {filteredPosts?.map((post,index) => (
                              
                              <div className="post-card">

                                <PostCard key={index} post={post} />

                              </div>

                            ))}

                        </div>

                        ) 
                        : 
                        (
                          <p className="text-2xl">Sorry,no article found . . . </p>
                        )     
                      }


                    </div>

                  )}

                  {postLoading && !postError && ( 

                        <div className="grid grid-cols-1 gap-y-10 gap-x-5 2xl:grid-cols-2">

                            {loader.map((loader,index) => (

                                <div className="w-full flex flex-col gap-8 item-center md:flex-row">

                                    <div className="w-full h-auto md:h-64 md:w-1/2">

                                        <div className="object-cover w-full h-[300px] md:h-full rounded-md pulse"/>

                                    </div>

                                    <div className="w-full md:w-1/2 flex flex-col gap-y-3">

                                        <div className="flex items-center gap-2 text-center">

                                            <span className="pulse h-4 w-24 rounded-full"/>
                                                
                                            <span className="pulse h-3 w-16 rounded-full"/>
                                            
                                        </div>

                                        <span className="h-5 w-full pulse rounded-full"/>
                                        
                                        <div  className="flex-1  pulse rounded-md"/>
                                        
                                        <span className="pulse h-3 w-[60%] rounded-full "/>

                                    </div>

                                </div>

                            ))}

                        </div>


                  )}

              </div>

            </div>

          </div>

        </section>

    )}

    {postError && (

      <Error retry={fetchPost}/>

    )}

    </>

  )
}
