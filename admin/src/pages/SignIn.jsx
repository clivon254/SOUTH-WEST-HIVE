

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


export default function SignIn() {


  const [formData ,setFormData] = useState({})

  const {loading,error} = useSelector(state => state.user)

  const {url,setToken,token} = useContext(StoreContext)

  const dispatch = useDispatch()

  const navigate = useNavigate()

  console.log(formData)

  // handleChange
  const handleChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {

      dispatch(signInStart())

      const res = await axios.post(url + "/api/auth/sign-in",formData)

      if(res.data.success)
      {
          dispatch(signInSuccess(res.data.rest))

          toast.success("You have signed successfully")

          navigate('/')

          setToken(res.data.token)

          localStorage.setItem("token", res.data.token)

          setFormData({})

      }

    }
    catch(error)
    {
      console.log(error.message)

      dispatch(signInFailure(error.message))
    }

  }


  return (

    <div className="w-full h-screen px-8 flex items-center justify-center">

      <div className="flex flex-col w-full gap-y-5">

        <div className="flex  flex-col items-center justify-center gap-y-5">

          <div className="flex items-center">

              <img 
                src={LOGO}
                alt="" 
                className="md:h-40 h-24 rounded-full"
              />

              <Logo />

          </div>

          <h1 className="title3">Sign In</h1>

        </div>

        <div className="w-full max-w-md mx-auto">

          <form onSubmit={handleSubmit} className="w-full space-y-4">

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

            <button 
              className="btn w-full rounded-md"
              type='submit'
              disabled={loading}
            >
              {loading ? 
               ('Loading .....')
                :
               ("Sign in")
              }
            </button>

            <div className=""> 

              <span className="text-xs font-bold">forgot password ? <Link to="/forgot-password" className="cursor-pointer text-secondaryDark dark:text-amber-400 hover:underline">click here</Link></span>

            </div>

            {error && (
               
               <Alert color="failure">{error}</Alert>

            )}

          </form>

        </div>


      </div>

    </div>

  )

}
