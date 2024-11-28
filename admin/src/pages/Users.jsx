
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { Table } from 'flowbite-react'
import { MdEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {HiExclamationCircle} from "react-icons/hi"



export default function Users() {

    const {url,token,users,setUsers,userLoading ,userError,fetchUser} =  useContext(StoreContext)

    const [open ,setOpen] = useState(false)

    const [userIdToDelete ,setUserIdToDelete] = useState(null)

    // handleDelete
    const handleDelete = async () => {

      try
      {

        const res = await axios.delete(url + `/api/user/delete-user/${userIdToDelete}`,{headers:{token}})

        if(res.data.success)
        {
          setOpen(false)

          setUsers((prev) => (

            prev.filter((user) => user._id !== userIdToDelete)
          ))
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

          {!userError && (<h1 className="text-center title">Users</h1> )}

          {!userLoading && !userError && (

            <div className="tabler">

              {users.length > 0 ? 
                (
                  <Table>

                  
                    <Table.Body className='table-title'>

                      <Table.Row>

                        <Table.Cell></Table.Cell>

                        <Table.Cell>image</Table.Cell>

                        <Table.Cell>Name</Table.Cell>

                        <Table.Cell>AccountType</Table.Cell>

                        <Table.Cell>Actions</Table.Cell>

                      </Table.Row>

                    </Table.Body>

                      {users.map((user,index) => (

                        <Table.Body>

                          <Table.Row>

                            <Table.Cell>{index + 1}.</Table.Cell>

                            <Table.Cell>

                              <img 
                                src={user.profilePicture} 
                                alt="" 
                                className="h-12 w-12 rounded-full bg-black"
                              />

                            </Table.Cell>

                            <Table.Cell className={`${user.isAdmin ? "font-semibold text-rose-500" :""}`}>
                              {user.username}
                            </Table.Cell>

                            <Table.Cell>
                              {user.accountType}
                            </Table.Cell>

                            <Table.Cell>
                              <div className="flex items-center gap-x-2">

                                <span className="">

                                  <Link to={`/update-user/${user._id}`}>

                                    <MdEdit size={24}/>

                                  </Link>

                                </span>

                                <span className="">

                                  <FaTrash 
                                    size={24} 
                                    onClick={() => {setOpen(true) ; setUserIdToDelete(user._id)}}
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
                  <p className="">
                    There are no Users yet !!!!
                  </p>
                )
              }

            </div>

          )}

          {userLoading && !userError && (

            <div className="grid place-content-center ">

              <div className="flex items-center gap-x-2 mt-20">

                <span className="loading"/> Loading .....

              </div>

            </div>

          )}

          {userError && (

            <Error retry={fetchUser}/>

          )}

        </section>

        {open && (

          <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

          <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

              <HiExclamationCircle size={40} className="mx-auto"/>

              <h2 className="text-center font-semibold font-title">Are you sure you want delete this User?</h2>

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
