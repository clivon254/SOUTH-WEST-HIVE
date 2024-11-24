

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import FilmCard from '../components/FilmCard'

export default function Film() {

  const {films} = useContext(StoreContext)

  console.log(films)

  return (

    <section className="section">

      {/* <h1 className="title2">Films crafted to inspire dreams</h1> */}

     {films.length > 0 ? 
        (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

            {films.map((film,index) => (

              <FilmCard film={film} index={index}/>

            ))}

          </div>
        ) 
        : 
        (
          <p className="title3">
            No films availble yet ....
          </p>
        )
    }

    </section>

  )

}
