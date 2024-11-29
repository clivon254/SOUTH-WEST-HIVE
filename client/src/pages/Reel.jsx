import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../context/store";


import VideoCard from "../components/VideoCard";


export default function Reel() {

    const {reels} = useContext(StoreContext)

    console.log(reels)

  return (
    
    <section className="section grid place-items-center gap-y-5 snap-mandatory snap-y">

        <h1 className="title text-center">Reels</h1>


        <div className="app__videos w-full lg:w-[70%] relative rounded-[20px] bg-white h-[70vh] max-w-md max-h-[1200px] overflow-scroll snap-y snap-mandatory">
           
           {reels.map((reel,map) => (

              <VideoCard key={map} reel={reel}/>

           ))}
           

        </div>


    </section>

  );
};


