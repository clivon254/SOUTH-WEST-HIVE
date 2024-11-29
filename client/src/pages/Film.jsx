
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { Table } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { MdEdit, MdViewArray } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import axios from 'axios'
import {HiExclamationCircle} from "react-icons/hi"

export default function Films() {

    const {url,token,films,setFilms,filmLoading,filmError,fetchFilms} = useContext(StoreContext)

    const [open, setOpen] = useState(false)

    const [filmIdToDelete ,setFilmIdToDelete] = useState(null)

    // handleDelete
    const handleDelete = async () => {

        try
        {
            const res = await axios.delete(url + `/api/film/delete-film/${filmIdToDelete}`,{headers:{token}})

            if(res.data.success)
            {
                setFilms((prev) =>
                    prev.filter((film) => film._id !== filmIdToDelete)
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

   <section className="section space-y-5">

        {!filmError && (<h1 className="text-center title">Films</h1>)}

        {!filmLoading && !filmError && (

            <div className="tabler">

                {films?.length > 0 ? 
                   (

                    <Table>

                        <Table.Body className="table-title">

                                <Table.Row>

                                    <Table.Cell></Table.Cell>

                                    <Table.Cell>Date</Table.Cell>

                                    <Table.Cell>title</Table.Cell>

                                    <Table.Cell>Actions</Table.Cell>

                                </Table.Row>

                            </Table.Body>

                        {films?.map((film,index) => (

                            <Table.Body>

                                <Table.Row>

                                    <Table.Cell>{index + 1}.</Table.Cell>

                                    <Table.Cell>{new Date(film.createdAt).toLocaleDateString()}</Table.Cell>

                                    <Table.Cell>{film?.title}</Table.Cell>

                                    <Table.Cell>

                                        <div className="flex items-center gap-x-2">


                                            <span className="">

                                                <Link to={`/update-film/${film._id}`}>

                                                    <MdEdit size={24}/>

                                                </Link>

                                            </span>

                                            <span className="">

                                                <FaTrash size={24} 
                                                 onClick={() => {setOpen(true) ; setFilmIdToDelete(film._id)}}
                                                />
                                                
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
                    <p className="text-center mt-20">
                        There are no films yet!!!
                    </p>
                  )
                }

            </div>
        )}

        {filmLoading && !filmError && (

            <div className="grid place-content-center">

                <div className="flex items-center gap-2 title3 mt-20">

                    <span className="loading"/> Loading ....

                </div>
                
            </div>
        )}

        {filmError && (

            <Error retry={fetchFilms}/>
        )}

   </section>

   
      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

          <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

            <HiExclamationCircle size={40} className="mx-auto"/>

            <h2 className="text-center font-semibold font-title">Are you sure you want delete this Film?</h2>

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
