

import React, { useContext, useRef,useState,useEffect } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/store';
import { useNavigate, useParams } from 'react-router-dom';
import { getDownloadURL, getStorage, uploadBytesResumable ,ref} from "firebase/storage"
import { app } from '../firebase';
import { signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/userSlice';
import { toast } from 'sonner';
import { Alert } from 'flowbite-react';
import axios from "axios"
import Error from '../components/Error';
import {HiExclamationCircle} from "react-icons/hi"


export default function UpdateUser() {

    const {loading,error} = useSelector(state => state.user)

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

    const [fetching ,setFetching] = useState(false)

    const [fetchingError ,setFetchingError] = useState(false)

    const {userId} = useParams()

    const [open ,setOpen] = useState(false)

    const [userIdToDelete ,setUserIdToDelete] = useState(null)



    // handleImageChange
    const handleImageChange = (e) => {

        const file = e.target.files[0]

        if(file)
        {
        setImageFile(file)

        setImageFileUrl(URL.createObjectURL(file))
        }
    }

    //fetchUser
    const fetchUser = async () => {

        try
        {
            setFetching(true)

            setFetchingError(false)

            const res = await axios.get(url + `/api/user/get-user/${userId}`)

            if(res.data.success)
            {
                setFetching(false)

                setFormData(res.data.rest)
            }

        }
        catch(error)
        {
            console.log(error.message)

            setFetching(false)

            setFetchingError(true)
        }

    }  

    useEffect(() => {

        fetchUser()

    },[])

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


        const res = await axios.put(url + `/api/user/update-user/${userId}`,formData,{headers:{token}})

        if(res.data.success)
        {

            toast.success("Profile updated successfully")

            navigate('/users')
        }
        else
        {
            console.log(error.message)
        }

        }
        catch(error)
        {

        console.log(error.message)

        dispatch(updateUserFailure(error.message))
        }

    }


    // handleDeleteAcount
    const handleDelete = async () => {

        try
        {}
        catch(error)
        {
            console.log(error.message)
        }

    }
    
    console.log(formData)


  return (
    <>

        {!fetching && !fetchingError && (

        
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
                    src={imageFileUrl || formData?.profilePicture} 
                    alt="user" 
                    className={`rounded-full w-full h-full object-cover border-8 border-secondaryLight dark:bg-secondaryDark 
                        ${imageFileUploadProgress && imageFileUploadProgress < 100 && `opacity-${imageFileUploadProgress}`}`}
                />

                </div>

                {imageFileUploadError && (

                    <Alert color="failure">{imageFileUploadError}</Alert>

                )}

                {/* username */}
                <input 
                    type="text" 
                    className="input" 
                    name="username"
                    placeholder='username'
                    onChange={handleChange}
                    defaultValue={formData?.username}
                />
                
                {/* email */}
                <input 
                    type="email" 
                    className="input" 
                    name="email"
                    placeholder='email'
                    onChange={handleChange}
                    defaultValue={formData?.email}
                />

                {/* account type */}
                <select 
                    name="accountType"  
                    className="input"
                    onChange={handleChange}
                    defaultValue={formData?.accountType}
                >

                    <option value="user" >user</option>

                    <option value="writer" >writer</option>

                    <option value="salesperson" >salesperson</option>

                    <option value="caterer" >caterer</option>

                    <option value="media" >media</option>

                </select>
                
                {/* admin */}
                <div className="flex items-center  gap-x-3">


                    <input 
                        type="checkbox" 
                        className="input" 
                        defaultChecked={formData.isAdmin}
                        onChange={(e) => setFormData({...formData, isAdmin : e.target.checked})}
                    />

                    <label htmlFor="" className="label">Is Admin</label>

                </div>

                {/* button */}
                <button 
                    type="submit"
                    className="btn rounded-md"
                    disabled={loading || imageFileUploading}
                >
                {loading ? ("Loading.....") : ("update")}
                </button>

            </form>

            <div className="text-red-500 flex justify-between mt-5">

                <span 
                    className="cursor-pointer" 
                    onClick={() => {setOpen(true) ; setUserIdToDelete(userId)}}
                >
                  Delete Account
                </span>


            </div>

            {updatedError && (

                <Alert color="failure">{updatedError}</Alert>

            )}

            {error && (

                <Alert color="failure">{error}</Alert>

            )}

            </section>
            
        )}

        {fetching && !fetchingError && (

          <div className="grid place-content-center">

            <div className="flex items-center gap-x-2 title2 mt-20">

                <span className="loading"/> Loading .....

            </div>

          </div>

        )}

        {fetchingError && (

            <Error retry={fetchUser}/>

        )}


        {open && (

            <div className="w-full h-full grid place-content-center fixed top-0 left bg-black/50 backdrop-blur-sm">

            <div className="space-y-5 p-4 w-[90%] mx-auto shadow-md bg-bgLight dark:bg-bgDark transtion-all duration-500 ease-in rounded">

                <HiExclamationCircle size={40} className="mx-auto"/>

                <h2 className="text-center font-semibold font-title">Are you sure you want delete this User?</h2>

                <div className="flex justify-between items-center">

                <button 
                    className="btn rounded-md"
                    onClick={() => handleDelete()}
                >
                    Yes, I'm sure
                </button>

                <button 
                    className="btn2 rounded-md"
                    onClick={() =>   setOpen(false)}
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
