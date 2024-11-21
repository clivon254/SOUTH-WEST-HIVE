

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { MdArrowRight } from 'react-icons/md'
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Table } from 'flowbite-react';

export default function Cart() {

  const {cartCount,cartData,products} = useContext(StoreContext)

  console.log(cartData)
  
  return (

   <section className="section">

      {cartCount > 0 ? 
        (
          <div className="w-full">

              {/* header */}
            <div className="flex items-center justify-between">

              <h2 className="title3">Your Cart</h2>

              <Link to="/shop">

                <span className="underline font-title font-semibold">Continue shopping</span>

              </Link>

            </div>

            <div className="w-full">

              {/* table */}
              <div className="tabler">

                <Table className="w-full">

                  <Table.Body className="table-title">

                    <Table.Row>

                      <Table.Cell>Product</Table.Cell>

                      <Table.Cell>Quantity</Table.Cell>

                      <Table.Cell>price</Table.Cell>
                      
                    </Table.Row>

                  </Table.Body>

                  {cartData?.map((item,index) => {

                    const productData = products.find((product) => product._id === item._id)

                    return(

                      <Table.Body>

                        <Table.Row>

                            <Table.Cell>Product</Table.Cell>

                            <Table.Cell>Product</Table.Cell>

                            <Table.Cell>Product</Table.Cell>

                        </Table.Row>

                      </Table.Body>

                    )

                  })}
                </Table>

              </div>

              {/* cart total */}
              <div className=""></div>

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
