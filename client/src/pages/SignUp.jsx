
import React, { useContext, useState } from 'react'
import LOGO from "../assets/LOGO.png"
import Logo from '../components/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import axios from "axios"
import {toast} from "sonner"
import {Alert} from "flowbite-react"
import { StoreContext } from '../context/store'
import Loading from '../components/Loading'
import Divider from '../components/Divider'
import OAuth from '../components/OAuth'


export default function SignUp() {


  const [formData ,setFormData] = useState({})

  const [loading ,setLoading] = useState(false)

  const {url,setToken,token} = useContext(StoreContext)

  const [confirm ,setConfirm]  = useState(null)

  const [errors, setErrors] = useState(null)

  const navigate = useNavigate()


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setErrors(null)

    if(formData.password !== confirm)
    {
        return setErrors("The passwords do not match")
    }

    setLoading(true)

    try
    {

      const res = await axios.post(url + "/api/auth/sign-up",formData)

      if(res.data.success)
      {

          setLoading(false)

          toast.success("You have Signed Up successfully")

          navigate('/sign-in')

          setFormData({})

      }
      else
      {
        setLoading(false)

        setErrors(res.data.message)
      }

    }
    catch(error)
    {
      console.log(error.message)

      setErrors(error.message)

      setLoading(false)
    }

  }


  return (

    <div className="w-full min-h-[75vh] px-8 flex flex-col items-center justify-center mx-auto max-w-xl">

      <div className="flex flex-col w-full gap-y-5">

        <div className="flex  flex-col items-center justify-center gap-y-5">

          {/* <div className="flex items-center">

              <img 
                src={LOGO}
                alt="" 
                className="md:h-40 h-24 rounded-full"
              />

              <Logo />

          </div> */}

          <h1 className="title3">Sign Up</h1>

        </div>

        <div className="w-full max-w-md mx-auto">

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            
            {/* email */}
            <div className="w-full flex flex-col gap-2">
               
              <label 
                htmlFor="" 
                className="label"
              >
                username
              </label>

              <input 
                type="text" 
                placeholder="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input" 
              />
                
            </div>

            {/* email */}
            <div className="w-full flex flex-col gap-2">
               
              <label 
                htmlFor="" 
                className="label"
              >
                email
              </label>

              <input 
                type="email" 
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input" 
              />
                
            </div>
            
            {/* password */}
            <div className="w-full flex flex-col gap-2">
               
              <label 
                htmlFor="" 
                className="label"
              >
                password
              </label>

              <input 
                type="password" 
                className="input"
                placeholder="*********" 
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
                
            </div>

            {/* confirm password */}
            <div className="w-full flex flex-col gap-2">
               
              <label 
                htmlFor="" 
                className="label"
              >
                confirm password
              </label>

              <input 
                type="password" 
                className="input"
                placeholder="*********" 
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
                
            </div>

            <button 
              className="btn w-full rounded-md"
              type='submit'
              disabled={loading}
            >
              {loading ? 
              <>
                <Loading />
              </>
                :
               ("Sign up")
              }
            </button>

            <div className=""> 

              <span className="text-xs font-bold">Already have an account? <Link to="/sign-in" className="cursor-pointer text-secondaryDark dark:text-amber-400 hover:underline">click here</Link></span>

            </div>

            {errors && (
               
               <Alert color="failure">{errors}</Alert>

            )}

          </form>

        </div>


      </div>

      <Divider label="or"/>

      <OAuth />


    </div>

  )

}
