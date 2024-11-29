
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'

export default function AddFilm() {

    const {url,token} = useContext(StoreContext)

    const [formData ,setFormData] = useState({})

    const [loading,setLoading] = useState(false)

    const [error ,setError] = useState(false)

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

            const res = await axios.post(url + '/api/film/create-film',formData,{headers:{token}})

            if(res.data.success)
            {
                setLoading(false)

                setFormData({})

                toast.success("The film has been added successfully")
            }

        }
        catch(error)
        {
            console.log(error.message)

            setError(error.message)

            setLoading(false)
        }

    }

    console.log(formData)


  return (

    <section className="section max-w-xl mx-auto">

        <h2 className="title text-center">Add Film</h2>

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
                        ("Add Film")
                    }
                </button>
                
                {error && (

                    <Alert color="failure">{error}</Alert>

                )}
            </form>


        </div>

    </section>

  )

}
