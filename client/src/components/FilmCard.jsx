


import React from 'react'

export default function FilmCard({film}) {

    
  return (

    <div className="w-full space-y-1">
        
        <div className="h-[300px] w-full">

            <iframe 
                width="100%"
                height="100%" 
                src={film.Link}
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerpolicy="strict-origin-when-cross-origin" 
                allowFullScreen
            />

            

        </div>

        <h1 className="text-2xl font-semibold">{film.title}</h1>

        <p className="text-base">{film.description.slice(0,250)}</p>

        <p className="text-sm">by :{film.UserId.username}</p>

        <p className="text-sm">{new Date(film.createdAt).toDateString()}</p>

    </div>

  )

}
