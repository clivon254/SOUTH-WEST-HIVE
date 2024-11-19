

import React, { useContext, useEffect, useState } from 'react'
import Popular from '../components/Popular'
import axios from 'axios'
import { StoreContext } from '../context/store'
import PostCard from '../components/PostCard'
import Error from '../components/Error'

export default function Catergory() {

    const query = new URLSearchParams(window.location.search).get("category")
    
    const {url} = useContext(StoreContext)

    const [posts ,setPosts] = useState([])

    const [error ,setError] = useState(false)

    const [Loading ,setLoading] = useState(false)

    const [Loader ,setLoader] = useState([{},{}])


    // fetchPost
    const fetchPost = async () => {

        setLoading(true)

        setError(false)

        try
        {

            const res = await axios.get(url + `/api/post/get-posts?category=${query}`)

            if(res.data.success)
            {
                setLoading(false)

                setPosts(res.data.posts)
            }
        }
        catch(error)
        {
            console.log(error.message)

            setLoading(false)

            setError(true)
        }

    } 

    useEffect(() => {

        fetchPost()

    },[])

  return (

    <>

        {!error && (

            <section className="section space-y-10">

                <h2 className="title2">{query}</h2>

                <div className="w-full flex flex-col lg:flex-row gap-y-20 gap-x-10">

                    {/* LEFT */}
                    <div className="w-full lg:w-2/3">

                        
                            <div className="space-y-10">

                                {!Loading && (

                                    <>

                                        {posts?.length > 0  ? 
                                            (
                                                <>

                                                {posts.map((post,index) => (

                                                    <PostCard post={post} key={index}/>

                                                ))}

                                                </>
                                            )
                                            :
                                            (
                                                <p className="text-xl font-semibold">There are no articles in {query} category yet .</p>
                                            )
                                        }

                                    </>

                                )}

                                {Loading  && (
                                
                                    <>
                                        {Loader.map((loader,index) => (

                                            <div className="w-full flex flex-col gap-8 item-center md:flex-row">

                                                <div className="w-full h-auto md:h-64 md:w-1/2">

                                                    <div className="object-cover w-full h-[300px] md:h-full rounded-md pulse"/>

                                                </div>

                                                <div className="w-full md:w-1/2 flex flex-col gap-y-3">

                                                    <div className="flex items-center gap-2 text-center">

                                                        <span className="pulse h-5 w-full rounded-md"/>
                                                            
                                                        <span className="pulse h-5 w-full rounded-md"/>
                                                        
                                                    </div>

                                                    <span className="h-12 w-full pulse rounded-md"/>
                                                    
                                                    <div  className="flex-1 pulse rounded-md"/>
                                                    
                                                    <span className="pulse h-5 w-full rounded-md "/>

                                                </div>

                                            </div>

                                        ))}
                                    </>

                                )}

                           </div>
                                
                      
                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-1/3 ">

                        <Popular/>

                    </div>

                </div>
                
            </section>

        )}

        {error && (

            <Error retry={fetchPost}/>
        )}

    </>



  )

}
