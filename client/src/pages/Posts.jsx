

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { Table } from 'flowbite-react'
import { MdCheck, MdClose, MdYard } from 'react-icons/md'
import { HiExclamation, HiExclamationCircle } from 'react-icons/hi'
import { FaEdit, FaTrash, FaVideo } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Error from '../components/Error'
import axios from 'axios'
import {toast} from "sonner"
import { useSelector } from 'react-redux'



export default function Posts() {

  const {url,token} = useContext(StoreContext)

  const [loader,setLoader] = useState([{},{},{},{},{},{},{},{}])

  const [postIdToDelete, setPostIdToDelete] = useState(null)

  const [open ,setOpen] = useState(false)

  const [posts ,setPosts] = useState([])

  const [postError ,setPostError] = useState(false)

  const [postLoading ,setPostLoading] = useState(false)

  const {currentUser} = useSelector((state) => state.user)

  // handleDelelte
  const handleDelete = async () => {

    try
    {
      const res = await axios.delete(url + `/api/post/delete-post/${postIdToDelete}`,{headers:{token}})

      if(res.data.success)
      {
        setPosts((prev) => 
          prev.filter((post) => post._id !== postIdToDelete)
        )

        toast.success('post deleted successfully')

        setOpen(false)

      }
    }
    catch(error)
    {
      console.log(error.message)

      setOpen(true)
    }

  }

  

  // fetchPosts
  const fetchPosts = async () => {

    setPostLoading(true)

    setPostError(false)
    
    try
    {
      const res = await axios.get(url + `/api/post/get-posts?userId=${currentUser._id}`)

      if(res.data.success)
      {
        setPostLoading(false)

        setPosts(res.data.posts)
      }
    }
    catch(error)
    {
      console.log(error.message)

      setPostError(true)
    }

  }


  useEffect(() => {

    fetchPosts()

  },[])


  return (

    <>
    
      <section className="section">

        {!postError && (<h1 className="text-center title">Posts</h1> )}

        {!postLoading && !postError && (

            <div className="tabler">

              {posts.length > 0 ? 
                (

                  <Table>

                    <Table.Body className="table-title">

                        <Table.Row>

                          <Table.Cell></Table.Cell>

                          <Table.Cell>Date</Table.Cell>

                          <Table.Cell>Image</Table.Cell>

                          <Table.Cell>Title</Table.Cell>

                          <Table.Cell>status</Table.Cell>

                          <Table.Cell>actions</Table.Cell>

                        </Table.Row>
                        
                    </Table.Body>

                    {posts.map((post,index) => (

                      <Table.Body key={index}>

                        <Table.Row>

                          <Table.Cell>{index+1}.</Table.Cell>

                          <Table.Cell>
                            {new Date(post.updatedAt).toLocaleString()}
                          </Table.Cell>

                          <Table.Cell>

                            <img 
                              src={post.images[0]} 
                              alt="post" 
                              className="h-12 dark:bg-purple-900" 
                            />

                          </Table.Cell>

                          <Table.Cell>
                            {post.title}
                          </Table.Cell>

                          <Table.Cell>
                            {post.status ? 
                              <MdCheck size={24} className="text-teal-700"/> 
                              : 
                              <MdClose size={24} className="text-red-700"/>
                            }
                          </Table.Cell>

                          <Table.Cell>

                            <div className="flex items-center gap-x-3">

                              <span className="">

                                <Link to={`/post/${post.slug}`}>

                                  <FaVideo size={24}/>

                                </Link>

                              </span>

                              <span className="">

                                <Link to={`/update-post/${post.slug}`}>

                                  <FaEdit size={24}/>

                                </Link>

                              </span>

                              <span className="">

                                <FaTrash 
                                  size={24}
                                  onClick={() => {
                                    setOpen(true)
                                    setPostIdToDelete(post._id)
                                  }}
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
                  <p className="title3 text-center">There are not posts yet !!</p>
                )
              }

            </div>

        )}

        {postLoading && !postError && (

          <div className="table">

            <Table>

              <Table.Body className="font-title">

                  <Table.Row>

                    <Table.Cell></Table.Cell>

                    <Table.Cell>Date</Table.Cell>

                    <Table.Cell>Image</Table.Cell>

                    <Table.Cell>Title</Table.Cell>

                    <Table.Cell>status</Table.Cell>

                    <Table.Cell>actions</Table.Cell>

                  </Table.Row>
                  
              </Table.Body>

              {loader.map((post,index) => (

                <Table.Body key={index}>

                  <Table.Row className="animate-pulse">

                    <Table.Cell>
                      <span className="block h-2 w-2 bg-zinc-300 dark:bg-zinc-700 rounded-md "/>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="block h-3 w-8 bg-zinc-300 dark:bg-zinc-700 rounded-md "/>
                    </Table.Cell>

                    <Table.Cell>

                      <span className="block h-5 w-12 bg-zinc-300 dark:bg-zinc-700 rounded-md "/>

                    </Table.Cell>

                    <Table.Cell>

                      <span className="block h-3 w-12 bg-zinc-300 dark:bg-zinc-700 rounded-md "/>

                    </Table.Cell>

                    <Table.Cell>
                      
                    <span className="block h-3 w-4 bg-zinc-300 dark:bg-zinc-700 rounded-md "/>

                    </Table.Cell>

                    <Table.Cell>

                      <div className="flex items-center gap-x-2">

                        <span className="block h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded-full "/>

                        <span className="block h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded-full "/>

                        <span className="block h-4 w-4 bg-zinc-300 dark:bg-zinc-700 rounded-full "/>

                      </div>

                    </Table.Cell>
                    
                  </Table.Row>

                </Table.Body>

              ))}
                    
            </Table>

          </div>

        )}

        {postError && (

          <Error retry={fetchPost}/>

        )}

      </section>

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

          <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

            <HiExclamationCircle size={40} className="mx-auto"/>

            <h2 className="text-center font-semibold font-title">Are you sure you want delete this post?</h2>

            <div className="flex justify-between items-center">

              <button 
                className="btn rounded-md"
                onClick={() => handleDelete()}
              >
                Yes, I'm sure
              </button>

              <button 
                className="btn2 rounded-md"
                onClick={() => setOpen(false)}
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
