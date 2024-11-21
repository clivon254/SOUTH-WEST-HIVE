

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { MdSearch } from 'react-icons/md'
import PostCard from '../components/PostCard'


export default function Articles() {

  const {posts} = useContext(StoreContext)

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



  return (

    <section className="section space-y-5">

      <div className=" text-center">

        {/* searchbar */}
        <div className="w-4/5 sm:w-1/2 inline-flex items-center border border-zinc-600 rounded-full gap-x-2 px-3 ">

          <input 
            type="text" 
            className="flex-1 rounded-full bg-transparent border-none" 
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
          <div className={` space-y-4 border border-zinc-500 dark:border-zinc-300 rounded-md p-3 ${showFilter ? "": "hidden sm:block"}`}>

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
          <div className="grid grid-cols-1 gap-y-10 gap-x-5 2xl:grid-cols-2"> 

            {filteredPosts.length > 0 ? (

              <>

                {filteredPosts?.map((post,index) => (

                  <PostCard key={index} post={post} />

                ))}

            </>

            ) 
            : 
            (
              <p className="text-2xl">Sorry,artilce not found . . . </p>
            )
          }
          </div>

        </div>

      </div>

    </section>

  )
}
