

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import {Table} from "flowbite-react"
import { MdEdit, MdViewArray } from "react-icons/md"
import { FaTrash } from 'react-icons/fa'
import { HiExclamationCircle } from 'react-icons/hi'
import {Link} from "react-router-dom"
import axios from 'axios'


export default function Access() {
    

  const {url,token,products,productsLoading,productsError,fetchProducts,setProducts} = useContext(StoreContext)

  const access = products?.filter((product) => product.Item === "Accessories")

  const [loader ,setLoader] = useState([{},{},{},{},{}])

  const [open ,setOpen] = useState(false)

  const [productIdToDelete ,setProductIdToDelete] = useState(null)


  // handleDelete
  const handleDelete = async () => {

    try
    {

      const res = await axios.delete(url + `/api/product/delete-product/${productIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {

        setProducts((prev) => 
          prev.filter((product) => product._id !== productIdToDelete)
        )

        setOpen(false)
      }

    }
    catch(error)
    {
       console.log(error.message)
    }

  }


  return (

    <>

      <section className="section">

        {!productsError && (
          <h1 className="title text-center">Accessories</h1>
        )}

        {!productsLoading && !productsError && (

          <div className="tabler">
              {access.length > 0 ? 
                (
                  
                  <Table>

                    <Table.Body className="table-title">

                      <Table.Row className="">

                        <Table.Cell></Table.Cell>

                        <Table.Cell>Date</Table.Cell>

                        <Table.Cell>Image</Table.Cell>

                        <Table.Cell>name</Table.Cell>

                        <Table.Cell>instock</Table.Cell>

                        <Table.Cell>actions</Table.Cell>

                      </Table.Row>

                    </Table.Body>

                    {access.map((merch,index) => (

                      <Table.Body>

                        <Table.Row>

                          <Table.Cell>{index +1}.</Table.Cell>

                          <Table.Cell>
                            {new Date(merch.createdAt).toLocaleString()}
                          </Table.Cell>

                          <Table.Cell>

                            <img 
                              src={merch?.images[0]}
                              alt="" 
                              className="w-20 h-12" 
                            />

                          </Table.Cell>

                          <Table.Cell>
                            {merch.name}
                          </Table.Cell>

                          <Table.Cell>
                            {merch.instock}
                          </Table.Cell>

                          {/* actions */}
                          <Table.Cell>

                            <div className="flex items-center gap-x-2">

                              <span className="">

                                <Link to={`/product/${merch._id}`}>

                                  <MdViewArray size={24}/>

                                </Link>

                              </span>

                              <span className="">

                                <Link to={`/update-access/${merch._id}`}>

                                  <MdEdit size={24}/>

                                </Link>

                              </span>

                              <span className="">
                                <FaTrash size={24}  onClick={() => {setProductIdToDelete(merch._id) ; setOpen(true)}}/> 
                              </span>

                            </div>

                          </Table.Cell>

                        </Table.Row>

                      </Table.Body>

                    ))}

                  </Table>
                ) 
                : 
                (
                  <p className="text-xl text-center mt-10 font-semibold">
                    There are not mercharndise yet !!!
                  </p>
                )
              }
          </div>

        )}

        {productsLoading && !productsError && (

          <div className="table">

              <Table>

                  <Table.Body className="table-title">

                    <Table.Row className="">

                      <Table.Cell></Table.Cell>

                      <Table.Cell>Date</Table.Cell>

                      <Table.Cell>Image</Table.Cell>

                      <Table.Cell>name</Table.Cell>

                      <Table.Cell>instock</Table.Cell>

                      <Table.Cell>actions</Table.Cell>

                    </Table.Row>

                  </Table.Body>

                  {loader.map((merch,index) => (

                    <Table.Body>

                      <Table.Row>

                        <Table.Cell>

                          <span className="h-5 w-5 pulse rounded-md"/>

                        </Table.Cell>

                        <Table.Cell>

                        <span className="h-5 w-12 rounded-md pulse"/>

                        </Table.Cell>

                        <Table.Cell>

                          <span className="h-10 w-12 rounded-md pulse"/>

                        </Table.Cell>

                        <Table.Cell>

                        <span className="h-5 w-12 rounded-md pulse"/>

                        </Table.Cell>

                        <Table.Cell>
                          <span className="h-4 w-4 rounded-md pulse"/>
                        </Table.Cell>

                        {/* actions */}
                        <Table.Cell>

                          <div className="flex items-center gap-x-2">

                            <span className="h-5 w-5 rounded-full pulse"/>

                            <span className="h-5 w-5 rounded-full pulse"/>

                            <span className="h-5 w-5 rounded-full pulse"/>

                          </div>

                        </Table.Cell>

                      </Table.Row>

                    </Table.Body>

                  ))}

              </Table>

          </div>

        )}

        {productsError && (

          <Error retry={fetchProducts}/>

        )}

      </section>

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

          <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

            <HiExclamationCircle size={40} className="mx-auto"/>

            <h2 className="text-center font-semibold font-title">Are you sure you want delete this Merchandise?</h2>

            <div className="flex justify-between items-center">

              <button 
                className="btn rounded-md"
                onClick={() => handleDelete()}
              >
                Yes, I'm sure
              </button>

              <button 
                className="btn2 rounded-md"
                onClick={() =>   setOpen(false)}
              >
                cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </>

  )
  
}
