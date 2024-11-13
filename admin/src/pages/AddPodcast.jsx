

import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useContext, useState } from 'react'
import { app } from '../firebase'
import { Alert } from 'flowbite-react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from "axios"



export default function AddPodcast() {

    const {url,token} = useContext(StoreContext)

    const [formData ,setFormData] = useState()

    const [audio ,setAudio] = useState(null)

    const [audioUploadProgress ,setAudioUploadProgress] = useState(null)

    const [audioUploadError ,setAudioUploadError] = useState(null)

    const [audioUploading ,setAudioUploading] = useState(false)

    const [photo ,setPhoto] = useState(null)

    const [photoUploadProgress ,setPhotoUploadProgress] = useState(null)

    const [photoUploadError ,setPhotoUploadError] = useState(null)

    const [photoUploading ,setPhotoUploading] = useState(false)

    const [loading , setLoading] = useState(false)

    const [error ,setError] = useState(null)

    const navigate = useNavigate()
    
    console.log(formData)

    // handleUploadAudio 
    const handleUploadAudio = () => {

        if(!audio)
        {
            setAudioUploadError("please select an audio")
            return
        }

        setAudioUploadProgress(null)

        setAudioUploadError(null)

        setAudioUploading(true)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + '-' + audio.name 

        const storageRef = ref(storage ,fileName)

        const uploadTask = uploadBytesResumable(storageRef ,audio)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100

                setAudioUploadProgress(progress.toFixed(0))
            },
            (error) => {

                setAudioUploadError("Podcast not uploaded")

                setAudioUploading(false)

                setAudioUploadProgress(null)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {

                    setAudioUploadError(null)

                    setAudioUploadProgress(null)

                    setAudioUploading(false)

                    setFormData({...formData , audio : downloadUrl})
                })
            }
        )
    }

    // handleUploadImage 
    const handleUploadPhoto = () => {

        if(!photo)
        {
            setPhotoUploadError("please select an Photo")
            return
        }

        setPhotoUploadProgress(null)

        setPhotoUploadError(null)

        setPhotoUploading(true)

        const storage = getStorage(app)

        const fileName = new Date().getTime() + '-' + photo.name 

        const storageRef = ref(storage ,fileName)

        const uploadTask = uploadBytesResumable(storageRef ,photo)

        uploadTask.on(
            'state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred /snapshot.totalBytes) * 100

                setPhotoUploadProgress(progress.toFixed(0))
            },
            (error) => {

                setPhotoUploadError("Podcast not uploaded")

                setPhotoUploading(false)

                setPhotoUploadProgress(null)
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {

                    setPhotoUploadError(null)

                    setPhotoUploadProgress(null)

                    setPhotoUploading(false)

                    setFormData({...formData , backgroundPicture : downloadUrl})
                })
            }
        )
    }
    
    // handleChange 
    const handleChange = (e) => {

        setFormData({...formData,[e.target.name]:e.target.value})

    }

    // handleSumbmit
    const handleSubmit = async (e) => {

        e.preventDefault()

        try
        {
            setLoading(true)

            setError(null)
            
            const res = await axios.post( url + '/api/podcast/create-podcast',formData,{headers:{token}})

            if(res.data.success)
            {
                setLoading(false)

                navigate('/podcasts')

                toast.success("Podcast is added successfully")
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

        <h1 className="title text-center">Add Podcast</h1>

        <div className="w-full">

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-6">

                {/* title */}
                <div className="flex flex-col gap-y-2">

                    <label className="label">Title</label>

                    <input 
                        type="text" 
                        className="input" 
                        placeholder='Podcast title . . . . . '
                        onChange={handleChange}
                        value={formData?.title}
                        name="title"
                    />

                </div>

                {/* audio */}
                <div className="flex flex-col gap-y-3">

                    <input 
                        type="file" 
                        className="input" 
                        accept='mp3/*'
                        onChange={(e) => setAudio(e.target.files[0])}
                    />

                    <button 
                        className="btn2 rounded-full"
                        type="button"
                        onClick={handleUploadAudio}
                        disabled={audioUploading}
                    >
                        {
                            audioUploading ? 
                             (
                                <div className="flex items-center gap-x-2 justify-center">

                                    <span className="loading"/> {audioUploadProgress} %

                                </div>
                             )
                                : 
                            'Upload Audio'
                        }
                    </button>

                    {audioUploadError && (

                        <Alert color="failure">{audioUploadError}</Alert>
                    )}

                    {formData?.audio && (

                        <audio controls>

                            <source src={formData.audio} type="audio/mp3" />
                
                        </audio>

                    )}

                </div>
                
                {/* photo */}
                <div className="flex flex-col gap-y-2">

                    <input 
                        type="file" 
                        className="input" 
                        accept='image/*'
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />

                    <button 
                        className="btn2 rounded-full"
                        type="button"
                        onClick={handleUploadPhoto}
                        disabled={photoUploading}
                    >
                        {photoUploading ? 
                            (
                                <div className="flex items-center justify-center gap-x-2">

                                    <span className="loading"/> {photoUploadProgress} %

                                </div>
                            ) 
                            :
                            ("upload background photo")
                        }
                       
                    </button>

                    {photoUploadError && (

                        <Alert color="failure">{photoUploadError}</Alert>

                    )}

                    {formData?.backgroundPicture && (

                        <img 
                            src={formData.backgroundPicture}
                            alt="" 
                            className="w-full h-[300px] md:h-[50vh]" 
                        />
                    )}

                </div>

                <button 
                    className="btn rounded-md"
                    type="submit"
                    disabled={loading || audioUploading || photoUploading}
                >
                    {loading ? 
                        (
                            <div className="flex items-center justify-center gap-x-3">

                                <span className="loading"/> Loading ....

                            </div>
                        ) 
                        : 
                        (
                            "add podcast"
                        )
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
