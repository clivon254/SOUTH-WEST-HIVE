

import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {

  return (

    <div className="w-full space-y-2 group">

        <div className="h-[250px] lg:h[300px] w-full">

            <Link to={`/product/${product._id}`}>
            
                <img 
                    src={product?.images[0]}
                    alt="" 
                    className="h-full w-full object-cover"
                />

            </Link>

        </div>

        <div className="">

            <h2 className="font-title font-semibold text-xl">{product.name}</h2>

            <div className="flex flex-col gap-y-1">

                {product?.discountPrice > 0 && (

                    <span className="font-semibold line-through text-xs">
                        {product?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                    </span>

                )}

                <span className="">
                    {product?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                </span>
        

            </div>
           
        </div>

    </div>

  )
  
}
