

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import moment from "moment"
import { FaThumbsUp } from 'react-icons/fa'
import { MdArrowDownward, MdClose } from 'react-icons/md'




export default function Comments({comment,onLike,onEdit,onDelete}) {
  
    const {url,token} = useContext(StoreContext)

    const [isEditing, setIsEditing] = useState(false)

    const [editedComment ,setEditedContent] = useState(comment.content)

    const {currentUser} = useSelector(state => state.user)

    const [reply ,setReply] = useState(false)

    const [replies ,setReplies] = useState([])

    const [replying ,setReplying] = useState(false)

    const [replyLoading ,setReplyLoading] = useState(false)

    const [veiwReply ,setVeiwReply] = useState(false)

    const [formData ,setFormData] = useState({
        commentId:comment?._id,
        userId:currentUser?._id
    })



    // handelEdit
    const handleEdit = async () => {

        setIsEditing(true)

        setEditedContent(comment.content)
    }

    // handleSave
    const handleSave = async () => {

        try
        {

            const res = await axios.put(url + `/api/comment/update-comment/${comment._id}`,{content:editedComment},{headers:{token}})

            if(res.data.success)
            {
                setIsEditing(false)

                onEdit(comment ,editedComment)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }
    }


    // fetchReplies
    const fetchReplies = async () => {

        try
        {
            setReplyLoading(true)

            const res = await axios.get(url + `/api/reply/get-CommentReplies/${comment._id}`)

            if(res.data.success)
            {
                setReplies(res.data.replies)

                setReplyLoading(false)
            }
        }
        catch(error)
        {
            console.log(error.message)
        }

    } 

    // handleSubmit
    const handleSubmit = async () => {


        try
        {
            setReplying(true)

            const res = await axios.post(url + `/api/reply/create-reply/${comment._id}`,formData,{headers:{token}})

            if(res.data.success)
            {
                setReplying(false)
                
                setFormData({})

                fetchReplies()

                setReply(false)
            }
        }
        catch(error)
        {
            console.log(error.message)

            setReplying(false)
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

            const res = await axios.post(url + `/api/reply/like-reply/${commentId}`,{},{headers:{token}})

            if(res.data.success)
            {
                setReplies(
                    replies.map( 
                    (comment) => comment._id === commentId ?
                        {
                            ...comment,
                            likes:res.data.reply.likes,
                            numberOfLikes:res.data.reply.likes.length
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

    useEffect(() => {

        fetchReplies()

    },[])


  return (

    <div className="w-full flex p-4 border-b border-zinc-300 dark:border-zinc-600 text-sm">
       
       {/* image */}
       <div className="flex-shrink-0 mr-3">

        <img 
          src={comment.userId.profilePicture}
          alt={"comment"}
          className="w-10 h-10 rounded-full " 
        />

       </div>

       <div className="flex-1">

            <div className="flex items-center mb-1">
                
                <span className="font-bold mr-1 text-xs">
                    {comment ? `@${comment?.userId?.username}` : "anonymous user"}
                </span>

                <span className="text-xs">
                    {moment(comment.createdAt).fromNow()}
                </span>

            </div>

            {isEditing ? 
                (
                   <>
                        <textarea 
                          value={editedComment} 
                          onChange={(e) => setEditedContent(e.target.value)}
                          className="mb-2 input w-full"
                        />

                        <div className="flex justify-between gap-2 text-xs">

                            <button 
                                type="button"
                                className="btn rounded-md"
                                onClick={handleSave}
                            >
                                save
                            </button>

                            <button 
                                className="btn2 rounded-md"
                                onClick={() => setIsEditing(false)}
                            >
                                cancel
                            </button>

                        </div>

                   </>
                ) 
                : 
                (
                    <div className="w-full">

                       <p className="pb-2">{comment.content}</p>
                        
                       {/* buttons */}
                      <div className="flex items-center gap-x-2 pt-2 text-xs max-w-fit pb-2">

                            <button 
                             type="button"
                             onClick={() => onLike(comment._id)}
                             className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && `!text-blue-500`} `}
                            >
                                <FaThumbsUp />
                            </button>

                            <p className="">
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes + ' ' + (comment.numberOfLikes === 1 ? 'like' : 'likes')
                                }
                            </p>

                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button 
                                        type="button"
                                        className="font-semibold"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>

                                    <button 
                                        type="button"
                                        className="font-semibold"
                                        onClick={() => onDelete(comment._id)}
                                    >
                                        Delete
                                    </button>

                                    <button 
                                        type="button"
                                        className="font-semibold hover:underline"
                                        onClick={() => setReply(true)}
                                    >
                                        reply
                                    </button>
                                </>
                            )}

                      </div>
                       
                       {/* reply */}
                       {reply && (

                            <div className="w-full">

                                <form className="w-full flex items-center gap-x-1">

                                    <textarea   
                                      className="input w-[70%] h-12"
                                      onChange={(e) => setFormData({...formData , content:e.target.value})}
                                      value={formData.content}
                                    />

                                    <button 
                                      type="button" 
                                      onClick={handleSubmit}
                                      className="btn rounded-md"
                                    >
                                        {replying ? <span className="loading"/> : "post"}
                                    </button>

                                    <button type="button" className="" onClick={() => setReply(false)}>
                                        <MdClose size={24}/>
                                    </button>

                                </form>

                            </div>

                       )}
                        
                        {/* replies */}
                       <div className="space-y-2">

                            {replies.length > 0 &&(

                                <div className="">

                                    <h2 onClick={() => setVeiwReply(!veiwReply)} className="text-sm flex items-center gap-2 font-bold hover:underline mb-3 cursor-pointer">
                                        {veiwReply ? "Hide" :"Veiw"} {replies.length} {replies.length === 1 ? "reply" :"replies"} <span className=""><MdArrowDownward/></span>
                                    </h2>

                                    {veiwReply && (

                                        replies.map((reply,index) => (

                                            <div className="flex gap-x-2">

                                                {/* image */}
                                                <div className="">

                                                    <img 
                                                    src={reply.userId.profilePicture} 
                                                    alt="" 
                                                    className="h-10 w-10 rounded-full" 
                                                    />

                                                </div>

                                                {/* detail */}
                                                <div className="">

                                                    <div className="flex items-center gap-1 text-xs">

                                                        <p className="font-semibold">@{reply.userId.username}</p>

                                                        <span className="">{moment(reply.createdAt).fromNow()}</span>

                                                    </div>
                                                    
                                                    <div className="space-y-1">

                                                       <p className="">{reply.content}</p>
                                                        
                                                        {/* reply likes */}
                                                        <div className="flex items-center gap-x-2 text-xs">

                                                            <button 
                                                                type="button"
                                                                onClick={() => handleLike(reply._id)}
                                                                className={`text-gray-400 hover:text-blue-500 ${currentUser && reply.likes.includes(currentUser._id) && `!text-blue-500`} `}
                                                            >
                                                                <FaThumbsUp />
                                                            </button>

                                                            <p className="">
                                                                {reply.numberOfLikes > 0 &&
                                                                    reply.numberOfLikes + ' ' + (reply.numberOfLikes === 1 ? 'like' : 'likes')
                                                                }
                                                            </p>

                                                        </div>
                                                      

                                                    </div>



                                                </div>

                                            </div>

                                        ))

                                    )}

                                </div>

                            )}

                       </div>

                    </div>
                )
            }

            

       </div>

    </div>

  )

}
