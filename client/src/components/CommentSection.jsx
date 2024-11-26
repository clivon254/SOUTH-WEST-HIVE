

import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { StoreContext } from '../context/store'
import {toast} from "sonner"
import Comments from './Comments'
import {HiExclamationCircle} from "react-icons/hi"



export default function CommentSection({postId}) {

  const {currentUser} = useSelector(state => state.user)

  const {url,token} = useContext(StoreContext)

  const [commentIdToDelete, setCommentToDelete] = useState(null)

  const [formData ,setFormData] = useState({
    postId,
    userId:currentUser?._id,
  })

  const navigate = useNavigate()

  const [comments, setComments] = useState([])

  const [commenting ,setCommenting] = useState(false)

  const [commentLoading ,setCommentLoading] = useState(false)
  
  const [open ,setOpen] = useState(false)


  // fetchComments
  const fetchComments = async () => {

    try
    {
      setCommentLoading(true)

      const res = await axios.get(url + `/api/comment/get-PostComments/${postId}`)

      if(res.data.success)
      {
        setCommentLoading(false)

        setComments(res.data.comments)

      }

    }
    catch(error)
    {
      console.log(error.message)

      setCommentLoading(false)
    }

  }


  useEffect(() => {

    fetchComments()

  },[])


  // handleSubmit
  const handleSubmit = async () => {

    try
    {

      setCommenting(true)

      const res = await axios.post(url + `/api/comment/create-comment/${postId}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setCommenting(false)

        setFormData({})

        fetchComments()
      }
    }
    catch(error)
    {
      console.log(error.message)

      setCommenting(false)
    }

  }

  // handleLike
  const handleLike = async (commentId) => {

    try
    {

        if(!currentUser)
        {
          navigate('sign-in')

          return
        }


        const res = await axios.post(url + `/api/comment/like-comment/${commentId}`,{},{headers:{token}})

        if(res.data.success)
        {
          setComments(
            comments.map( 
              (comment) => comment._id === commentId ?
                  {
                    ...comment,
                    likes:res.data.comment.likes,
                    numberOfLikes:res.data.comment.likes.length
                  }
                  :
                  comment
            )
          )
        }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }

  // handleEdit
  const handleEdit  = async (comment ,editedComment) => {

    setComments(
      comments.map((c) => 
        c._id === comment._id ? {...c, content:editedComment} : c
      )
    )
    

  }

  // handleDelete
  const handleDelete = async (commentId) => {

    try
    {

      setOpen(true)

      const res = await axios.delete(url + `/api/comment/delete-comment/${commentId}`,{headers:{token}})

      if(res.data.success)
      {
        setOpen(false)

        setComments(comments.filter((comment) => comment._id !== commentId))

      }

    }
    catch(error)
    {
      console.log(error.message)
    }

  }


  return (
    <>
    
      <div className="space-y-5">

        <h1 className="title3">Comments</h1>

        {currentUser ? 
          (
            <div className="flex items-center gap-1 my-5 ">

              <p className="text-sm font-semibold">Signed as:</p>

              <img 
                src={currentUser.profilePicture} 
                alt="" 
                className="h-5 w-5 object-cover rounded-full" 
              />

              <Link to="/profile" className="text-xs font-semibold text-rose-600 hover:underline">
                @{currentUser.username}
              </Link>

            </div>
          ) 
          : 
          (
            <Link to="/sign" className="py-10">

              <button className="w-full btn2 rounded-full">
                sign in to comment
              </button>

            </Link>
          )
        }

        {currentUser && (

          <form  
            onSubmit={handleSubmit}
            className="border border-zinc-600 dark:border-zinc-300 rounded-md p-3"
          >

            <textarea 
              name="content" 
              className="input w-full"
              maxLength='500'
              onChange={(e) => setFormData({...formData, content : e.target.value})}
              value={formData.content}
            />

            <div className="flex justify-between items-center mt-5">

              <p className="text-xs">
                {500 - formData?.content?.length} characters remaining
              </p>

              <button 
                className="btn2 rounded-md"
                type="submit"
              >
                {commenting ? 
                (
                  <div className="flex items-center">

                    <span className="loading"/>Commenting ...

                  </div>
                ) 
                : 
                  ("Submit")
                }
              </button>

            </div>

          </form>
        )}


        {comments.length === 0 ? 
        (
          <p className="font-semibold">
            No comments yet be the first one to comment
          </p>
        ) 
        : 
        (
          <>

            {comments.map((comment, index) => (

              <Comments 
                key={index}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setCommentToDelete(commentId)
                  setOpen(true)
                }}
              />

            ))}

          </>
        )
        }

      </div>

      {open && (

        <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

          <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

            <HiExclamationCircle size={40} className="mx-auto"/>

            <h2 className="text-center font-semibold font-title">Are you sure you want delete this comment?</h2>

            <div className="flex justify-between items-center">

              <button 
                className="btn rounded-md"
                onClick={() => handleDelete(commentIdToDelete)}
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
