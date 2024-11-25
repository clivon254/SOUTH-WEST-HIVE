

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
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Banner2 from '../components/Banner2';
import PostBanner from '../components/PostBanner';
import Banner3 from '../components/Banner3';

gsap.registerPlugin(ScrollTrigger)

export default function Home() {

  const {posts,merch,access,food,brands} = useContext(StoreContext)

  const randomIndex = Math.floor(Math.random() * posts.length)

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

  useGSAP(() => {

    // catergory card
    gsap.from(".category-card",{
      opacity:0,
      y:50,
      duration:0.5,
      ease:"power3.out",
      stagger:0.3,
      scrollTrigger:{
        trigger:".category-card",
        start:"top 80%",
        toggleActions:"play none none none"
      }
    })

    // post card
    gsap.from(".post-card", {
      opacity: 0,
      x: -50, // Start from x: -50
      stagger: 0.3,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#posts", // Trigger when the #posts section comes into view
        start: "top 80%", // Start the animation when the top of the #posts section is at 80% of the viewport height
        toggleActions: "play none none none"
      }
    });

  },[])

  return (

    <section className="">

      {/*  banner1*/}
      <Banner1 />

      {/* POST BANNER */}
      <div className="space-y-5 section ">

        <h2 className="title2 ">Random articles</h2>

        <PostBanner post={posts[randomIndex]}/>

      </div>

      {/* categories */}
      <div className="section space-y-5">

        <h1 className="title2">Popular catergories</h1>

        <div className="w-full flex flex-wrap gap-y-3 gap-x-3 md:gap-x-5  lg:gap-x-7">

          {CATEGORIES?.map((cat) => (

            <Link
              key={cat.label}
              to={`/category?category=${cat?.label}`}
              className={`category-card flex items-center justify-center gap-3 ${cat.color} rounded-md cursor-pointer px-4 py-2 `}
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

                  <div id="posts" className="post-card">

                      <PostCard key={index} post={post}/>

                  </div>

              ))}
              

            </div>
          
          </div>

          {/* right */}
          <div className="w-full lg:w-1/3">

            <Popular />

          </div>

      </div>
      

      {/* banner2 */}
      <div className="">

        <Banner2 />
        
      </div>

      {/* La Elite */}
      <div className="section space-y-5">
          
          <h2 className="title2">Taste happiness in every dish</h2>


          <SlideProducts products={food}/>

      </div>

      {/* banner3 */}
      <div className="">

        <Banner3 />

      </div>

      {/* merchendise */}
      <div className="section space-y-5">

        <h1 className="title2">Get Our Merchendise</h1>

        <SlideProducts products={merch}/>

      </div>

      {/* accessories */}
      <div className="section space-y-5">

        <h1 className="title2">Get Our Accessories</h1>

        <SlideProducts products={access}/>

      </div>

      {/* brands */}
      <div className="section bg-zinc-200/50  dark:bg-zinc-400/50">
            
          <div className="w-full  flex flex-row gap-x-5 overflow-y-auto brand">

            {brands.map((brand,index) => (

              <div className="flex flex-col items-center gap-y-3">

                <div className="h-20 w-20">

                   <img 
                      src={brand?.image}
                      alt="" 
                      className="h-full w-full" 
                    />

                </div>
          
                <span className="block uppercase txt-base md:text-xl font-title font-semibold">
                  {brand?.name}
                </span>

              </div>

            ))}

           </div>

      </div>

    </section>

  )

}
