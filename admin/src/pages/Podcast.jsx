

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import {HiExclamationCircle} from "react-icons/hi"
import Error from '../components/Error'
import axios from 'axios'
import { Table } from 'flowbite-react'
import { FaTrash } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Player from '../components/Player'

export default function Podcast() {

    const {url,token,podcasts,podcastLoading ,podcastError ,fetchPodcast ,setPodcasts,audioRef,track,playWithId} = useContext(StoreContext)

    const [open ,setOpen] = useState(false)

    const [podcastIdToDelete ,setPodcastToDelete] = useState(null)
    
    // handleDelete
    const handleDelete = async () => {

        try
        {
            const res = await axios.delete(url + `/api/podcast/delete-podcast/${podcastIdToDelete}`,{headers:{token}})

            if(res.data.success)
            {
                setOpen(false)

                setPodcasts((prev) => (
                    prev.filter((podcast) => podcast._id !== podcastIdToDelete)
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

        <section className="section relative h-[90vh]">

            <h1 className="text-center title">Podcasts</h1>

            {!podcastLoading && !podcastError && (

                <div className="tabler h-[90%] bg-red-100 overflow-hidden ">

                    {podcasts.length > 0 ? 
                        (
                            <Table>

                                <Table.Body className="table-title">

                                        <Table.Row>

                                            <Table.Cell></Table.Cell>

                                            <Table.Cell>image</Table.Cell>

                                            <Table.Cell>
                                                title
                                            </Table.Cell>

                                            <Table.Cell>
                                                Duration
                                            </Table.Cell>

                                            <Table.Cell>
                                                actions
                                            </Table.Cell>


                                        </Table.Row>

                                </Table.Body>

                                {podcasts?.map((podcast,index) => (

                                    <Table.Body key={index}>

                                        <Table.Row>

                                            <Table.Cell>{index + 1}.</Table.Cell>

                                            <Table.Cell>

                                                <img 
                                                    src={podcast.backgroundPicture} 
                                                    alt="" 
                                                    className="h-20 w-20 object-fill" 
                                                />

                                            </Table.Cell>

                                            <Table.Cell>
                                                {podcast.title}
                                            </Table.Cell>

                                            <Table.Cell 
                                                className="cursor-pointer"
                                                onClick={() => playWithId(podcast._id)}
                                            >

                                                {Math.floor(podcast.duration / 3600).toString().padStart(2, '0')}:
                                                {Math.floor((podcast.duration % 3600) / 60).toString().padStart(2, '0')}:
                                                {Math.floor(podcast.duration % 60).toString().padStart(2, '0')}
                    
                                            </Table.Cell>

                                            <Table.Cell>

                                                <div className="flex items-center gap-x-3">

                                                    <span className="">

                                                        <Link to={`/update-podcast/${podcast._id}`}>

                                                            <MdEdit size={24}/>

                                                        </Link>

                                                    </span>

                                                    <span className="">

                                                        <FaTrash 
                                                            size={24}
                                                            onClick={() => {
                                                                setPodcastToDelete(podcast._id)             
                                                                setOpen(true)
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
                            <p className="text-center title3">
                                There are no podcasts yet !!!!!
                            </p>
                        )
                   }

                   {/* player */}
                   <Player />

                   <audio ref={audioRef} src={track?.audio} preload='auto'></audio>

                </div>

            )}

            {podcastLoading && !podcastError && (

                <div className="grid place-content-center">

                    <div className="flex items-center justify-center gap-x-2 mt-20 title3">

                        <span className="loading"/> Loading ...

                    </div>

                </div>
            )}

            {podcastError && (

                <Error retry={fetchPodcast}/>

            )}

        </section>

        {open && (

            <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={40} className="mx-auto"/>

                <h2 className="text-center font-semibold font-title">Are you sure you want delete this Podcast?</h2>

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
