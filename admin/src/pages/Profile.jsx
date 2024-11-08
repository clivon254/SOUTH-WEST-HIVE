

import React, { useContext, useRef,useState,useEffect } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/store';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, uploadBytesResumable ,ref} from "firebase/storage"
import { app } from '../firebase';
import { signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { toast } from 'sonner';
import { Alert } from 'flowbite-react';
import axios from "axios"



export default function Profile() {

  const {currentUser,loading,error} = useSelector(state => state.user)

  const {url,token} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [imageFile ,setImageFile] = useState(null)

  const [imageFileUrl ,setImageFileUrl] = useState(null)

  const [imageFileUploading ,setImageFileUploading] = useState(false)

  const [imageFileUploadProgress ,setImageFileUploadProgress] = useState(null)

  const [imageFileUploadError ,setImageFileUploadError] = useState(null)

  const [updatedSuccess ,setUpdatedSuccess] = useState(null)

  const [updatedError ,setUpdatedError] = useState(null)

  const filePickerRef = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()


  

  // handleImageChange
  const handleImageChange = (e) => {

    const file = e.target.files[0]

    if(file)
    {
      setImageFile(file)

      setImageFileUrl(URL.createObjectURL(file))
    }
  }

  useEffect(() => {

    if(imageFile)
    {
      uploadImage()
    }

  },[imageFile])

  // uploadImage
  const uploadImage = () => {

    setImageFileUploading(true)

    setImageFileUploadError(null)

    const storage = getStorage(app)

    const fileName = new Date().getTime() + imageFile.name 

    const storageRef = ref(storage , fileName)

    const uploadTask = uploadBytesResumable(storageRef ,imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100

        setImageFileUploadProgress(progress.toFixed(0))
      },
      (error) => {

        setImageFileUploadError('Could not upload an image (File must be less than 5MB)')

        setImageFile(null)

        setImageFileUrl(null)

        setImageFileUploadProgress(null)

        setImageFileUploading(false)
      },
      () => {

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

          setImageFileUrl(downloadURL)

          setFormData({...formData ,profilePicture : downloadURL})

          setImageFileUploading(false)
        })

      }
    )
  }

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData ,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    if(Object.keys(formData).length === 0)
    {
      setUpdatedError('No changes made')

      return
    }

    if(imageFileUploading)
    {
      setUpdatedError('Please wait for the image to finish uploading')

      return
    }

    try
    {
      setUpdatedError(null)

      dispatch(updateUserStart())

      const res = await axios.put(url + `/api/user/update-user/${currentUser?._id}`,formData,{headers:{token}})

      if(res.data.success)
      {
        dispatch(updateUserSuccess(res.data.rest))

        toast.success("Profile updated successfully")
      }
      else
      {
        console.log(error.message)

        dispatch(updateUserFailure(res.data.message))
      }

    }
    catch(error)
    {

      console.log(error.message)

      dispatch(updateUserFailure(error.message))
    }

  }

  // handleSignOut
  const handleSignOut = () => {

    dispatch(signOutUserSuccess())

    toast.success("sign out successfully")

    localStorage.removeItem("token")

    navigate('/')

  }



  return (

    <section className="section max-w-2xl mx-auto space-y-10">

      <h1 className="title text-center">Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        <input 
          type="file"
          onChange={handleImageChange} 
          accept='image/*'
          ref={filePickerRef}
          hidden
        />

        <div 
          className="relative h-32 w-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width:'100%',
                  height:'100%',
                  position:'absolute',
                  top:0 ,
                  left:0
                },
                path:{
                  stroke:`rgba(62, 152, 199 ,${imageFileUploadProgress})`
                }
              }}
            />
          )}

          <img 
              src={imageFileUrl || currentUser?.profilePicture} 
              alt="user" 
              className={`rounded-full w-full h-full object-cover border-8 border-secondaryLight dark:bg-secondaryDark 
                ${imageFileUploadProgress && imageFileUploadProgress < 100 && `opacity-${imageFileUploadProgress}`}`}
          />

        </div>

        {imageFileUploadError && (

          <Alert color="failure">{imageFileUploadError}</Alert>

        )}


        <input 
          type="text" 
          className="input" 
          name="username"
          placeholder='username'
          onChange={handleChange}
          defaultValue={currentUser?.username}
        />

        <input 
          type="email" 
          className="input" 
          name="email"
          placeholder='email'
          onChange={handleChange}
          defaultValue={currentUser?.email}
        />

        <input 
          type="password" 
          className="input" 
          name="password"
          placeholder='*******'
          onChange={handleChange}
        />

        <button 
          type="submit"
          className="btn rounded-md"
          disabled={loading || imageFileUploading}
        >
          {loading ? ("Loading.....") : ("update")}
        </button>

      </form>

      <div className="text-red-500 flex justify-between mt-5">

        <span className="cursor-pointer">
          Delete Account
        </span>

        <span onClick={handleSignOut} className="cursor-pointer">
          Sign out
        </span>

      </div>

      {updatedError && (

        <Alert color="failure">{updatedError}</Alert>

      )}

      {error && (

        <Alert color="failure">{error}</Alert>

      )}

    </section>

  )
}
