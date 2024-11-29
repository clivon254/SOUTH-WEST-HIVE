

import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate, useParams } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import Error from '../components/Error'

export default function UpdateFood() {

  const {url,token} = useContext(StoreContext)

  const [files ,setFiles] = useState([])

  const [uploading ,setUploading] = useState(false)

  const [imageUploadProgress ,setImageUploadProgress] = useState(null)

  const [imageUploadError , setImageUploadError] = useState(null)

  const [publishingError, setPublishingError] = useState(null)

  const [loading, setLoading] = useState(false)

  const [formData ,setFormData] = useState({})

  const[fetching , setFetching] = useState(false)

  const [fetchingError ,setFetchingError] = useState(false)

  
  const navigate = useNavigate()

  const {foodId} = useParams()


  // fetchProduct
  const fetchProduct = async () => {

    try
    {
      setFetching(true)

      setFetchingError(false)

      const res = await axios.get(url + `/api/product/get-product/${foodId}`)

      if(res.data.success)
      {
        setFetching(false)

        setFormData(res.data.product)
      }
    }
    catch(error)
    {
      console.log(error.message)

      setFetchingError(true)
    }
  } 


  useEffect(() => {

    fetchProduct()

  },[foodId])

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData ,[e.target.name]:e.target.value})

  }

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

          setImageUploadError(null)

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
      images:formData?.images?.filter((_,i) => i !== index)
    })

  }


  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault(e)

    try
    {

      setLoading(true)

      const res = await axios.put(url + `/api/product/update-product/${formData._id}`,formData,{headers:{token}})

      if(res.data.success)
      {
        setFormData({})

        navigate(`/product/${res.data.updatedProduct._id}`)

        toast.success(`${res.data.updatedProduct.name} is updated successfully`)

        setLoading(false)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setLoading(false)
    }

  }


  console.log(formData)


  return (

    <>

      {!fetching && !fetchingError && (

    
        <section className="section space-y-5">

          <h1 className="title text-center">Update Food</h1>

          <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-5">

            <div className="w-full md:w-[60%] flex flex-col gap-y-4 gap-x-3 md:grid md:grid-cols-2">

                <input 
                  type="text" 
                  className="input w-full"
                  placeholder='name'
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />

                <select
                  className="input  w-full"
                  name="Item"
                  onChange={handleChange}
                  value={formData.Item}
                >
                  <option value="Catering" >Catering</option>
                </select>

                <select
                  className="input  w-full"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Breakfast" >Breakfast</option>

                  <option value="Snack" >Snack</option>

                  <option value="lunch" >lunch</option>

                  <option value="supper" >supper</option>

                </select>

 
                <input 
                  type="number" 
                  className="input w-full"
                  placeholder='regularPrice'
                  required
                  name="regularPrice"
                  value={formData.regularPrice}
                  onChange={handleChange}
                />

                <div className="flex items-center gap-2">

                  <input 
                    type="checkbox" 
                    className="input "
                    placeholder='name'
                    name="name"
                    checked={formData.offer}
                    onChange={(e) => setFormData({...formData , offer:e.target.checked})}
                  />

                  <span className="label">Offer</span>

                </div>

                {/* discount */}
                {formData.offer && (

                  <input 
                    type="number" 
                    className="input w-full"
                    placeholder='discountPrice'
                    required
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                  />

                )}
                
  

                
            </div>
        
            <div className="w-full md:w-[40%] space-y-3">

              {/* upload images */}
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
                      className="btn2 rounded-full w-full"
                      disabled={uploading}
                      onClick={handleImageSubmit}
                    >
                    {uploading ? 
                      <div className="flex items-center gap-5 justify-center">
                        <span className="loading"/> {imageUploadProgress}%
                      </div>
                      :
                      'upload'
                    }
                  </button>
              </div>

              {imageUploadError && (

                <Alert color="failure">{imageUploadError}</Alert>

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
                className="btn rounded-md w-full"
                disabled={loading || uploading}
                type="submit"
              >
                {loading ? 
                (
                    <>

                      <div className="flex items-center justify-center gap-x-5">

                        <span className="loading"/> loading ....

                      </div>

                    </>
                ) 
                : 
                ("update product")}
              </button>

              {publishingError && (

                <Alert>{publishingError}</Alert>

              )}

            </div>

          </form>

        </section>

      )}

      {fetching && !fetchingError &&(

          <div className="mb-10 grid place-content-center">

            <div className="">

              <span className="loading "/>

            </div>

          </div>

      )}

      {fetchingError && (

        <Error retry={fetchProduct}/>

      )}

   </>

  )
  
}
