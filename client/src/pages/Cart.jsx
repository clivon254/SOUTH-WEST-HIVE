

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { MdArrowRight } from 'react-icons/md'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Table } from 'flowbite-react';
import SlideProducts from '../components/SlideProducts';
import axios from "axios"
import {toast} from "sonner"


export default function Cart() {

  const {cartCount,cartData,products,cartAmount,url,token,fetchCart} = useContext(StoreContext)

  console.log(cartData)

  const navigate = useNavigate()

  // handleIncrease
  const handleIncreaseCart = async (product,item) => {

    let data ;

    if(product.sizes)
    {
       
        data = {
          itemId:product._id,
          size:item.size
        }
    }
    else
    {
      data = {
        itemId:product._id
      }
    }

   
      try
        {
            const res = await axios.post(url + "/api/cart/add-cart",data,{headers:{token}})

            if(res.data.success)
            {

                fetchCart()

            }
            else
            {
                console.log("check the api")
            }
        }
        catch(error)
        {
            console.log(error.message)
        }
   

  }

  // handleDecrease
  const handleDecreaseCart = async (product,item) => {

    let data ;

    if(product.sizes)
    {
       
        data = {
          itemId:product._id,
          size:item.size
        }
    }
    else
    {
      data = {
        itemId:product._id
      }
    }

   
      try
      {
          const res = await axios.post(url + "/api/cart/remove-cart",data,{headers:{token}})

          if(res.data.success)
          {

              fetchCart()

          }
          else
          {
              console.log("check the api")
          }
      }
      catch(error)
      {
          console.log(error.message)
      }
   

  }



  return (

   <section className="section">

      {cartCount > 0 ? 
        (
          <div className="w-full space-y-8">

            {/* header */}
            <div className="flex items-center justify-between">

              <h2 className="title3">Your Cart</h2>

              <Link to="/shop">

                <span className="underline font-title font-semibold">Continue shopping</span>

              </Link>

            </div>

            <div className="w-full space-y-16">

              {/* table */}
              <div className="tabler">

                <Table className="w-full">

                  <Table.Body className="table-title">

                    <Table.Row>

                      <Table.Cell colSpan={2}>Product</Table.Cell>

                      <Table.Cell>Quantity</Table.Cell>

                      <Table.Cell>price</Table.Cell>
                      
                    </Table.Row>

                  </Table.Body>

                  {cartData?.map((item,index) => {

                      const productData = products.find((product) => product._id === item._id)

                      return(

                        <Table.Body>

                          <Table.Row>

                              <Table.Cell colSpan={2}>

                                <div className="flex gap-x-3">

                                  <img 
                                      src={productData?.images[0]} 
                                      alt="" 
                                      className="h-12 md:h-20 w-12 md:w-20 object-cover" 
                                  />

                                  {/* details */}
                                  <div className="">

                                    <span className="block font-bold text-textSecondaryLight dark:text-secondaryDark text-wrap">{productData?.name}</span>

                                    <span className="block">
                                      {productData?.discountPrice > 0 ? 
                                        (productData?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' }))
                                        :
                                        (productData?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' }))
                                      }
                                    </span>

                                    {item?.size && (

                                    <span className="block">
                                      Size: {item?.size}
                                    </span>

                                    )}

                                  </div>

                                </div>

                              </Table.Cell>
                              
                              {/* quantity */}
                              <Table.Cell>

                                <div className="flex items-center">

                                    <span className="quantity " onClick={() => handleDecreaseCart(productData,item)}>-</span>

                                    <span className="quantity">{item.quantity}</span>

                                    <span className="quantity" onClick={() => handleIncreaseCart(productData,item)}>+</span>

                                </div>

                              </Table.Cell>

                              <Table.Cell className="text-xl font-semibold">
                                {(item?.quantity * (productData?.discountPrice > 0 ? productData?.discountPrice : productData?.regularPrice)).toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}
                              </Table.Cell>

                          </Table.Row>

                        </Table.Body>

                      )

                  })}

                </Table>

              </div>

              {/* cart total */}
              <div className="w-full lg:flex justify-end">
                    
                    <div className="space-y-5 w-full lg:w-2/5">

                        <h2 className="title3">Cart Total</h2>

                        <div className="flex justify-between">

                          <span className="text-base font-semibold">Amount</span>

                          <span className="text-sm font-semibold">
                            {(cartAmount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' })}
                          </span>

                        </div>

                        {/* button */}
                        <div className="w-full">

                          <button className="w-full bg-black h-16 text-white text-base font-semibold">
                            
                            <Link to="/checkout">
                                 PROCEED TO CHECK OUT
                            </Link>

                          </button>

                        </div>

                    </div>
                    
              </div>

              {/* featued products */}
              <div className="space-y-5">

                <h1 className="title3">Related Products</h1>

                <div className="">

                  <SlideProducts products={products}/>

                </div>

              </div>

            </div>

          </div>
        ) 
        :
        (
          <div className="w-full flex flex-col items-center gap-y-5">

              <p className="text-center title2">Your cart is empty</p>

              <Link to={'/shop'}>

                <button className="flex items-center gap-x-5 btn rounded-md ">
                  Return to shop <span cla ssName="">< FaLongArrowAltRight className="animate-ping" size={32}/></span>
                </button>

              </Link>

          </div>
        )
    }

   </section>

  )
}
