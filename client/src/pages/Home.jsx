

import React, { useContext, useEffect ,useState} from 'react'
import { StoreContext } from '../context/store'
import Popular from '../components/Popular'
import PostCard from '../components/PostCard'
import { GiClothes } from "react-icons/gi";
import { MdCastForEducation, MdOutlineSports } from 'react-icons/md';
import { SiDcentertainment } from "react-icons/si";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate'
import Banner1 from '../components/Banner1';
import SlideProducts from '../components/SlideProducts';

export default function Home() {

  const {posts,merch,access,food,brands} = useContext(StoreContext)

  const [currentItems ,setCurrentItems] = useState([])

  const [itemOffset, setItemOffset] = useState(0);

  const [pageCount ,setPageCount] = useState(0)

  const postPerPage = 3



  useEffect(() => {

    const endOffset = itemOffset + postPerPage;
    
    setCurrentItems(posts.slice(itemOffset ,endOffset))

    setPageCount(Math.ceil(posts.length / postPerPage))

  },[posts,itemOffset,postPerPage])



  //  pageClick
  const handlePageClick = (event) => {

    const newOffset = (event.selected * postPerPage) % posts.length;
    
    setItemOffset(newOffset);

  };


  const CATEGORIES = [
    {
      label:"Fashion",
      color:"bg-[#e11d48]",
      text:"text-[#fff]",
      icon:<GiClothes size={24} className="text-white"/>
    },
    {
      label:"Sports",
      color:"bg-[#2563eb]",
      text:"text-[#fff]",
      icon:<MdOutlineSports size={24} className="text-white"/>
    },

    {
      label:"Education",
      color:"bg-[#ca8a04]",
      text:"text-[#fff]",
      icon:<MdCastForEducation size={24} className="text-white"/>
    },

    {
      label:"Entertainment",
      color:"bg-[#9333ea]",
      text:"text-[#fff]",
      icon:<SiDcentertainment size={24} className="text-white"/>
    },
  ]

  return (

    <section className="">

      {/*  banner1*/}
      <Banner1 />

      {/* categories */}
      <div className="section space-y-5">

        <h1 className="title2">Popular catergories</h1>

        <div className="w-full flex flex-wrap gap-y-3 gap-x-3 md:gap-x-5  lg:gap-x-7">

          {CATEGORIES?.map((cat) => (

            <Link
              key={cat.label}
              to={`/category?category=${cat?.label}`}
              className={`flex items-center justify-center gap-3 ${cat.color} rounded-md cursor-pointer px-4 py-2 `}
            >
              {cat.icon}
              <span className="lg:text-xl font-logo font-semibold text-white">{cat.label}</span>
            </Link>

          ))}

        </div>

      </div>


      {/* posts */}
      <div id="posts" className="section w-full flex flex-col lg:flex-row gap-20 2xl:gap-20 py-10">

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
      
      {/* merchendise */}
      <div className="section space-y-5">

        <h1 className="title2">Get Our Merchendise</h1>

        <SlideProducts products={merch}/>

      </div>

      {/* banner2 */}
      <div className=""></div>

      {/* La Elite */}
      <div className="">

      </div>

      {/* banner3 */}
      <div className=""></div>

      {/* accessories */}
      <div className="section space-y-5">

        <h1 className="title2">Get Our Accessories</h1>

        <SlideProducts products={access}/>

      </div>

      {/* brands */}
      <div className="section bg-black  dark:bg-black/30">
            
          <div className="flex items-center justify-center gap-x-10 overflow-x-scroll brand">

            {brands.map((brand,index) => (

              <div className="">

                <div className="h-20 w-20">

                   <img 
                      src={brand?.image}
                      alt="" 
                      className="h-full w-full" 
                    />

                </div>

              {/* 
                <span className="block ">
                  {brand?.name}
                </span> */}

              </div>

            ))}

           </div>

      </div>

    </section>

  )

}
