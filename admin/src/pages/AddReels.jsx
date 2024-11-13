

import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'

export default function AddReels() {
  
    const {url ,token} = useContext(StoreContext)

    const [loading ,setLoading] = useState(false)

    const [file ,setFile] = useState(null)

    const [videoUploadProgress ,setvideoUploadProress] = useState(null)

    const [videoUploadError ,setvideoUploadError] = useState(null)

    const [formData ,setFormData] = useState({})

    const [postingError ,setPostingError] = useState(null)

    const [uploading ,setUploading] = useState(false)


    // handleUpload
    const handleVideoUpload = async () => {

        try
        {
            if(!file)
            {
                setvideoUploadError("Please select a mp4 video")

                return
            }

            setvideoUploadError(null)

            setUploading(true)

            const storage = getStorage(app)

            const fileName = new Date().getTime() + '-' + file.name 

            const storageRef = ref(storage ,fileName)

            const uploadTask = uploadBytesResumable(storageRef ,file)

            uploadTask.on(
                'state_change',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    setvideoUploadProress(progress.toFixed(0))

                },
                (error) => {

                    setvideoUploadError("video upload failed")

                    setvideoUploadProress(null)

                    setUploading(false)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        setvideoUploadProress(null)

                        setvideoUploadError(null)

                        setUploading(false)

                        setFile(null)

                        setFormData({...formData , video:downloadURL})
                    })
                }
            )

        }
        catch(error)
        {
            console.log(error)
        }

    }

    // handleSubmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            setLoading(true)

            const res = await axios.post(url + '/api/reel/create-reel',formData,{headers:{token}})

            if(res.data.success)
            {
                setLoading(false)

                setFormData({})

                toast.success("The reel is has been created successfully")
            }

        }
        catch(error)
        {
            console.log(error.message)

            setPostingError(error.message)

            setLoading(false)
        }

    }

    // handleChange
    const handleChange = async (e) => {

        setFormData({...formData , [e.target.name]:e.target.value})
    }


   console.log(formData)

  return (

    <section className="section space-y-10 max-w-xl mx-auto">

        <h1 className="title text-center">Add Reel</h1>

        <div className="">

            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">Video</label>
                    
                    <input 
                        accept="mp4/*"
                        type="file" 
                        onChange={(e) =>setFile(e.target.files[0])}
                        className="input" 
                    />

                </div>

                <button 
                   type="button"
                    className="btn2 rounded-full"
                    disabled={videoUploadProgress}
                    onClick={handleVideoUpload}
                >
                    {uploading ? 
                        (
                            <div className="flex items-center justify-center gap-x-3">

                                <span className="loading"/> {videoUploadProgress} %

                            </div>
                        ) 
                        : 
                        ("upload") 
                    }
                </button>

                {videoUploadError && (

                    <Alert color="failure">{videoUploadError}</Alert>
                )}

                <div className="flex flex-col gap-y-2">

                    <label htmlFor="" className="label">description</label>

                    <textarea 
                         name="description"
                         value={formData.value}
                         onChange={handleChange}
                         className="input"
                         placeholder='Type here ....'
                    />

                </div>

                <button 
                    type="submit"
                    className="btn rounded-md"
                    disabled={loading || uploading}
                >
                    {loading ? 
                        (
                            <div className="flex items-center justify-center gap-x-2">

                                <span className="loading"/> Loading ....

                            </div>
                        ) 
                        : 
                        ("add reel")
                    }
                </button>

                {postingError && (

                    <Alert color="failure">{postingError}</Alert>
                )}

            </form>

        </div>

    </section>

  )

}
