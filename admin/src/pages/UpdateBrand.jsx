

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useEffect, useState } from 'react'
import { app } from '../firebase'
import { StoreContext } from '../context/store'
import { Alert } from 'flowbite-react'
import axios from "axios"
import {toast} from "sonner"
import { useNavigate, useParams } from 'react-router-dom'
import Error from '../components/Error'


export default function UpdateBrand() {

    const {url ,token} = useContext(StoreContext)

    const [formData ,setFormData] = useState({})

    const [file ,setFile] = useState(null)

    const [imageUlpoadProgress ,setImageUploadProgress] = useState(null)

    const [imageUlpoadError ,setImageUploadError] = useState(null)

    const [Ulpoading ,setUploading] = useState(false)

    const [loading ,setLoading] = useState(false)

    const [error ,setError] = useState(null)

    const [fetching ,setFetching] = useState(false)

    const [fetchingError ,setFetchingError] = useState(false)

    console.log(formData)

    const {brandId} = useParams()

    const navigate = useNavigate()

    // fetchBrand
    const fetchBrand = async () => {

        try
        {
            setFetching(true)

            setFetchingError(false)

            const res = await axios.get(url + `/api/brand/get-brand/${brandId}`)

            if(res.data.success)
            {
                setFormData(res.data.brand)

                setFetching(false)
            }
        }
        catch(error)
        {
            console.log(error.message)

            setFetchingError(true)

            setFetching(false)
        }

    }

    useEffect(() => {

        fetchBrand()
    }
    ,[brandId])

    // handleImageUpload
    const handleImageUpload = async () => {

        try
        {
            if(!file)
            {
                setImageUploadError("Please select an image")

                return
            }


            setImageUploadError(null)

            setImageUploadProgress(null)

            setUploading(true)

            const storage = getStorage(app)

            const fileName = new Date().getTime() + '-' + file.name 

            const storageRef = ref(storage ,fileName)

            const uploadTask = uploadBytesResumable(storageRef ,file)

            uploadTask.on(
                'state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100

                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {

                    setImageUploadError("Image upload failed")

                    setImageUploadProgress(null)

                    setUploading(false)

                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setImageUploadProgress(null)

                        setImageUploadError(null)


                        setUploading(false)

                        setFormData({...formData ,image:downloadURL})
                    })
                }
            )
        }
        catch(error)
        {
            console.log(error.message)
        }

    }

    // handleChange
    const handleChange = (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            setLoading(true)

            setError(null)

            const res = await axios.put(url + `/api/brand/update-brand/${brandId}`,formData,{headers:{token}})

            if(res.data.success)
            {
                setLoading(false)

                setFormData({})

                navigate('/brand')

                toast.success("The brand has been created successfully")
            }
        }
        catch(error)
        {
            console.log(error.message)

            setLoading(false)

            setError(error.message)
        }

    }

  return (

    <section className="section space-y-10">

        {!fetchingError && (<h1 className="title text-center">Update Brand</h1>)}

        {!fetching && !fetchingError &&(

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                <div className="flex flex-col gap-y-3">

                    <input 
                        type="file" 
                        className="input"
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <button 
                        className="btn2 rounded-full"
                        type="button"
                        onClick={handleImageUpload}
                        disabled={Ulpoading}
                    >
                        {Ulpoading ? 
                            (
                                <div className="flex items-center justify-center gap-x-3">

                                    <span className="loading"/> {imageUlpoadProgress} %

                                </div>
                            ) 
                            : 
                        ("upload image")}
                    </button>

                    {imageUlpoadError && (

                        <Alert color="failure">{imageUlpoadError}</Alert>

                    )}

                    {formData?.image && (

                        <img 
                            src={formData.image} 
                            alt="" 
                            className="w-full h-40 lg:h-[50vh]" 
                        />

                    )}

                </div>

                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">name</label>

                    <input  
                    type="text" 
                    placeholder='name of the brand'
                    className="input" 
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    />

                </div>

                <button 
                    className="btn rounded-md"
                    type="submit"
                    disabled={Ulpoading || loading}
                >
                    {loading ? 
                        (
                            <div className="flex justify-center items-center">

                                <span className="loading"/> Loading ...

                            </div>
                        )
                        :
                        ("Update Brand")
                    }
                </button>

                {error && (

                    <Alert color="failure">{error}</Alert>

                )}

            </form>

        )}

        {fetching && !fetchingError && (

            <div className="grid place-content-center">

                <div className="flex items-center gap-x-2">

                    <span className="loading"/> Loading ....

                </div>

            </div>

        )}

        {fetchingError && (

            <Error retry={fetchBrand}/>

        )}

        
    </section>

  )

}