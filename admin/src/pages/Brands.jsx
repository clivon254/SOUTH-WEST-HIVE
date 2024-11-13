

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { Table } from 'flowbite-react'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { HiExclamationCircle } from 'react-icons/hi'
import axios from 'axios'


export default function Brands() {

   const {url,token,brands,brandLoading,brandError,setBrands,fetchBrand} = useContext(StoreContext)

    const [open, setOpen] = useState(false)

    const [brandIdToDelete ,setBrandIdToDelete] = useState(null)

    // handleDelete
    const handleDelete = async () => {

        try
        {
            const res = await axios.delete(url + `/api/brand/delete-brand/${brandIdToDelete}`,{headers:{token}})

            if(res.data.success)
            {
                setOpen(false)

                setBrands((prev) => 
                    prev.filter((brand) => brand._id !== brandIdToDelete)
                )
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    }


  return (

    <>

        <section className="section space-y-10">

            {!brandError &&(<h1 className="title text-center ">Brands</h1>)}

            {!brandLoading && !brandError &&(

                <div className="tabler">

                    {brands.length > 0 ? 
                        (
                            <Table>
                                
                                <Table.Body className="table-title">

                                        <Table.Row>

                                            <Table.Cell></Table.Cell>

                                            <Table.Cell>image</Table.Cell>

                                            <Table.Cell>name</Table.Cell>

                                            <Table.Cell> actions</Table.Cell>


                                        </Table.Row>

                                </Table.Body>

                                {brands.map((brand,index) => (

                                    <Table.Body key={index}>

                                        <Table.Row>

                                            <Table.Cell>{index +1}.</Table.Cell>

                                            <Table.Cell>

                                                <img 
                                                    src={brand.image} 
                                                    alt="" 
                                                    className="h-20" 
                                                />

                                            </Table.Cell>

                                            <Table.Cell>
                                                {brand.name}
                                            </Table.Cell>

                                            <Table.Cell>

                                                <div className="flex items-center gap-x-2">

                                                    <span className="">

                                                        <Link to={`/update-brand/${brand._id}`}>

                                                            <MdEdit size={24} />

                                                        </Link>

                                                    </span>

                                                    <span className="">

                                                        <FaTrash size={24} onClick={() => {setOpen(true)  ; setBrandIdToDelete(brand._id)}}/>

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
                            <p className="text-center title3">
                                There are not brands yet !!!
                            </p>
                        )
                    }
                </div>

            )}

            {brandLoading && !brandError && (

            <div className="grid place-content-center">

                    <div className="flex items-center gap-x-2 mt-20 title3">

                        <span className="loading"/> Loading ...
                        
                    </div>

            </div>

            )}

            {brandError && (

                <Error retry={fetchBrand}/>

            )}

        </section>

        {open && (

            <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={40} className="mx-auto"/>

                <h2 className="text-center font-semibold font-title">Are you sure you want delete this Brand?</h2>

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
