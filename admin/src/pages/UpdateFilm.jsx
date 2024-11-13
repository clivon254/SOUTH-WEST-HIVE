
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import { useParams } from 'react-router-dom'
import Error from '../components/Error'

export default function UpdateFilm() {

    const {url,token} = useContext(StoreContext)

    const [formData ,setFormData] = useState({})

    const [loading,setLoading] = useState(false)

    const [error ,setError] = useState(false)

    const [fetching ,setFetching] = useState(false)

    const [fetchingError ,setFetchingError] = useState(false)

    const {filmId} = useParams()

    // handleChange
    const handleChange = async (e) => {

        setFormData({...formData ,[e.target.name] : e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {

            setLoading(true)

            setError(null)

            const res = await axios.put(url + `/api/film/update-film/${filmId}`,formData,{headers:{token}})

            if(res.data.success)
            {
                setLoading(false)

                setFormData({})

                toast.success("The film has been UPDATED successfully")
            }

        }
        catch(error)
        {
            console.log(error.message)

            setError(error.message)

            setLoading(false)
        }

    }

    // fetchFilm
    const fetchFilm = async () => {

        try
        {
            setFetching(true)
            
            setFetchingError(false)

            const res = await axios.get(url + `/api/film/get-film/${filmId}`)

            if(res.data.success)
            {
                setFetching(false)

                setFormData(res.data.shortFilm)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setFetchingError(true)
        }

    }

    useEffect(() => {

        fetchFilm()

    },[])

    


  return (

    <>

        {!fetchingError && !fetching &&(

            <section className="section">

            <h2 className="title text-center">Update Film</h2>

                <div className="">

                    <form  onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                        {/* title*/}
                        <div className="flex flex-col gap-1">

                            <label htmlFor="" className="label">Title</label>

                            <input 
                                type="text" 
                                className="input"
                                placeholder='title'
                                name={"title"} 
                                onChange={handleChange}
                                value={formData.title}
                            />

                        </div>

                        {/* link*/}
                        <div className="flex flex-col gap-1">

                            <label htmlFor="" className="label">Link</label>

                            <input 
                                type="text" 
                                className="input"
                                placeholder='Link'
                                name={"Link"} 
                                onChange={handleChange}
                                value={formData.Link}
                            />

                        </div>

                        {/* description */}
                        <div className="flex flex-col gap-1">

                            <label htmlFor="" className="label">Description</label>

                            <textarea 
                                name="description"
                                value={formData.description} 
                                onChange={handleChange}
                                placeholder='Type here .....'
                                className="input"
                            />

                        </div>

                        <button 
                            type="submit"
                            className="btn rounded-md"
                        >
                            {loading ? 
                                (
                                    <div className="flex items-center justify-center gap-x-2">

                                        <span className="loading"/> Loading ....

                                    </div>
                                ) 
                                : 
                                ("Update Film")
                            }
                        </button>
                        
                        {error && (

                            <Alert color="failure">{error}</Alert>

                        )}
                    </form>


                </div>

            </section>
            
        )}

        {fetching && !fetchingError &&(

            <div className="grid place-content-center">

                <div className="flex items-center gap-2 mt-20">

                    <span className="loading"/>Loading ...

                </div>

            </div>

        )}

        {fetchingError && (

            <Error retry={fetchFilm}/>
            
        )}

    </>

  )

}
