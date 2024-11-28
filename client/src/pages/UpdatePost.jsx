

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../context/store'
import Error from '../components/Error'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css' 
import { Alert } from 'flowbite-react'
import axios from "axios"
import {toast} from "sonner"



export default function UpdatePost() {


  const {url,token} = useContext(StoreContext)

  const [loading ,setLoading] = useState(false)

  const [error ,setError] = useState(false)

  const {slug}  = useParams()

  const [files, setFiles] = useState([])

  const [uploading ,setUploading] = useState(null)

  const [imageUploadProgress , setImageUploadProgress] = useState(null)

  const [imageUploadError , setImageUploadError] = useState(null)

  const [publishError , setPublishError] = useState(null)

  const [updating ,setUpdating] = useState(false)


  const [formData , setFormData] = useState({
    images:[]
  })

  const navigate = useNavigate()



  // handleImageSubmit
  const handleImageSubmit = (e) => {

    if(files.length > 0 && files.length + formData.images.length < 7)
    {
      setUploading(true)

      setImageUploadError(null)

      const promises = []

      for (let i = 0 ; i < files.length ; i++)
      {
        promises.push(storageImage(files[i]))
      }

      Promise.all(promises)
      .then((urls) => {

        setFormData({
          ...formData,
          images:formData.images.concat(urls)
        })

        setImageUploadError(false)

        setUploading(false)

      })
      .catch((error) => {

        setImageUploadError('Image upload failed (5MB max per image)')

        setUploading(false)
      })

    }
    else
    {
      setImageUploadError('You can only upload 6 images per post')

      setUploading(false)
    }
  }

  // storageImage
  const storageImage = async (file) => {

    return new Promise((resolve,reject) => {

      const storage = getStorage(app)

      const fileName = new Date().getTime() + file.name 

      const storageRef = ref(storage ,fileName)

      const uploadTask = uploadBytesResumable(storageRef , file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {

          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100

          setImageUploadProgress(progress.toFixed(0))
        },
        (error) => {

          reject(error)

        },
        () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            resolve(downloadURL)

          })

        }
      )

    })

  }

  // handleRemoveImage
  const handleRemoveImage = (index) => {

    setFormData({
      ...formData,
      images:formData?.images.filter((_,i) => i !== index)
    })

  }


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(formData?.images?.length < 1 )
    {
      return setPublishError("You must upload at leat one Image")
    }

    try
    {
      setUpdating(true)

      setPublishError(null)

      const res = await axios.put(url + `/api/post/update-post/${formData._id}`,formData,{headers:{token}})

      if(res.data.success)
      {
        toast.success("Post updated successfully")

        setUpdating(false)

        setPublishError(null)

        navigate(`/post/${res.data.updatedPost.slug}`)
      }
      else
      {
        setPublishError(res.data.message)

        setUpdating(false)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setPublishError(error.message)

      setUpdating(false)
    }

  }


  // fetchPost
  const fetchPost = async () => {

    try
    {
      setLoading(true)

      setError(false)

      const res = await axios.post(url + `/api/post/get-post/${slug}`)

      if(res.data.success)
      {
        setLoading(false)

        setError(false)

        setFormData(res.data.post)
      }
    
    }
    catch(error)
    {
      console.log(error)

      setError(true)
    }

  }


  useEffect(() => {

    fetchPost()

  },[slug])
  


  return (

   <>

    {!loading && !error && (

      <section className="section space-y-10">

        <h1 className="title text-center">Update Post</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-y-5 gap-x-8">

            <div className="w-full md:w-[60%] space-y-4 mb-20">

              <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between">

                <input 
                  type="text"
                  placeholder="Title"
                  required
                  className="input w-full md:flex-1" 
                  onChange={(e) => setFormData({...formData ,title:e.target.value})}
                  value={formData.title}
                />

                <select  
                  className="input"
                  value={formData.category}
                  required
                  onChange={(e) => setFormData({...formData ,category:e.target.value})}
                >

                  <option value="Fashion" >Fashion</option>
                  
                  <option value="Education" >Education</option>

                  <option value="Sports" >Sports</option>

                  <option value="Entertainment" >Entertainment</option>

                </select>

              </div>

              <div className="flex items-center gap-x-3 ">

                  <label htmlFor="" className="font-bold">Status :</label>

                  <select  
                    className="input"
                    value={formData.status}
                    required
                    onChange={(e) => setFormData({...formData ,status:e.target.value})}
                  >

                    <option value="false" >false</option>

                    <option value="true" >true</option>

                  </select>

              </div>

              <ReactQuill 
                theme="snow"
                placeholder="write something"
                className="h-60 mb-20"
                required
                value={formData.description}
                onChange={(value) => {
                  setFormData({...formData,description:value})
                }}
              />

            </div>

            {/* image upload */}
            <div className="w-full md:w-[40%] space-y-4">

              <p className="">Images <span className="">The Images will cover here max(6)</span></p>
              
              <div className="flex flex-col gap-y-2">

                  <input 
                    type="file" 
                    multiple
                    accept='image/*'
                    onChange={(e) => setFiles(e.target.files)}
                    className="input"
                  />

                  <button
                    type="button" 
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    className="btn rounded-md"
                  >
                    {uploading ? 
                      <div className="w-10 h10 grid place-content-center">

                        <CircularProgressbar 
                          value={imageUploadProgress}
                          text={`${imageUploadProgress || 0}`}
                        />

                      </div>
                      :
                      'upload'
                    }
                  </button>

              </div>

              {imageUploadError && (

                <Alert>{imageUploadError}</Alert>

              )}

              {/* images */}
              {formData?.images?.length > 0 && 
                formData?.images?.map((url,index) => (

                  <div 
                    className="flex justify-between p-3 items-center shadow-md dark:border dark:border-gray-600"
                    key={url}
                  >

                    <img 
                      src={url}
                      alt="images" 
                      className="w-20 h-20 object-contain rounded-lg"
                    />

                    <button 
                      className="text-red-700 "
                      onClick={() => handleRemoveImage(index)}
                    >
                      Delete
                    </button>

                  </div>

                ))
              }

              <button 
                type="submit"
                className="btn rounded-md"
                disabled={updating || uploading}
              >
                {loading ? <Loading/> : "update"}
              </button>

              {publishError && (

                <Alert color="failure">{publishError}</Alert>

              )}

            </div>

        </form>

      </section>

    )}


    {loading && !error && (

       <div className="grid place-content-center mt-10">

            <Loading />

       </div>

    )}

    {error && (

      <Error retry={fetchPost}/>

    )}

   </>
    
  )
  
}
