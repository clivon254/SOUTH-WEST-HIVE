


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductPage() {

    const [product,setProduct] = useState(null)

    const {productId} = useParams()

    // fetch

    useEffect(() => {


    },[])

  return (

    <div>ProductPage</div>

  )

}
