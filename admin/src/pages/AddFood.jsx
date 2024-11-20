


import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/store'
import { useNavigate } from 'react-router-dom'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import { toast } from 'sonner'
import { Alert } from 'flowbite-react'
import Loading from '../components/Loading'



export default function AddFood() {

    const {url,token,fetchProducts} = useContext(StoreContext)

    const [files ,setFiles] = useState([])

    const [uploading ,setUploading] = useState(false)

    const [imageUploadProgress ,setImageUploadProgress] = useState(null)

    const [imageUploadError , setImageUploadError] = useState(null)

    const [publishingError, setPublishingError] = useState(null)

    const [loading, setLoading] = useState(false)

    const [formData ,setFormData] = useState({
      images:[],
      offer:false,
      Item:'Catering',
      discountPrice:0,
      category:'Breakfast'
    })


    const navigate = useNavigate()

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

      if(formData?.images?.length < 0)
      {
        return setPublishingError("upload atleast one image")
      }

      try
      {
        setLoading(true)

        const res = await axios.post(url + "/api/product/create-food",formData,{headers:{token}})

        if(res.data.success)
        {
          setFormData({})

          navigate(`/product/${res.data.newProduct._id}`)

          toast.success(`${res.data.newProduct.name} is added successfully`)

          setLoading(false)

          fetchProducts()
        }
        else
        {
          setLoading(false)

          setPublishingError(res.data.message)
        }

      }
      catch(error)
      {
        console.log(error.message)

        setPublishingError(error.message)

        setLoading(false)
      }

    }



   console.log(formData)

  return (

    <section className="section space-y-5">

      <h1 className="title text-center">Add Food</h1>

      <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-y-10 gap-x-5">

        <div className="w-full md:w-[60%] flex flex-col gap-y-4 gap-x-3 ">

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
              <Loading />
           ) 
           : 
           ("Add Food")}
          </button>

          {publishingError && (

            <Alert>{publishingError}</Alert>

          )}

        </div>

      </form>

    </section>

  )
  
}
