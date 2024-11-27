

import React, { useContext, useState } from 'react'
import LOGO from "../assets/LOGO.png"
import Logo from '../components/Logo'
import { StoreContext } from '../context/store'
import axios from 'axios'
import { Alert } from 'flowbite-react'
import { Link, useParams } from 'react-router-dom'


export default function ResetPassword() {

  const {url} = useContext(StoreContext)

  const [formData, setFormData] = useState({})

  const [loading, setLoading] = useState(false)

  const [error ,setError] = useState(null)

  const [success , setSuccess] = useState(null)

  const {token} = useParams()


  // handleChange
  const handleChange = (e) => {

    setFormData({...formData, [e.target.name]:e.target.value})

  }

  // handleSubmit
  const handleSubmit = async (e) => {

    e.preventDefault()

    try
    {
      setLoading(true)

      setError(null)

      const res = await axios.post(url +`/api/auth/reset-password/${token}`,formData)

      if(res.data.success)
      {
        setLoading(false)

        setSuccess("password reset click to sign in")

        setFormData({})
      }

    }
    catch(error)
    {
      console.log(error.message)

      // Check if error response exists
      if (error.response) {
        // If the server responded with a status code outside the 2xx range
        const errorMessage = error.response.data.message || "An error occurred.";
        
        setError(errorMessage)

        setLoading(false)

        setSuccess(null)
       
      } 
      else 
      {
        
        setError(error.message)

        setLoading(false)

        setSuccess(null)

      }
    }

  }


  return (

    <div className="w-full h-screen px-8 flex items-center justify-center">

      <div className="flex flex-col w-full gap-y-5">

        {/* heading */}
        <div className="flex  flex-col items-center justify-center gap-y-3">

          <div className="flex items-center">

              <img 
                src={LOGO}
                alt="" 
                className="md:h-40 h-24 rounded-full"
              />

              <Logo />

          </div>

          <h1 className="title3">Reset password </h1>

        </div>

        {/* form */}
        <div className="w-full max-w-md mx-auto">

          <form  onSubmit={handleSubmit} className="w-full space-y-3">

            <div className="flex flex-col gap-2">

              <label 
                htmlFor="" 
                className="label"
              >
                password
              </label>

              <input 
                type="password" 
                placeholder="**********"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input" 
              />

            </div>

            <div className="flex flex-col gap-2">

              <label 
                htmlFor="" 
                className="label"
              >
                confirm password
              </label>

              <input 
                type="password" 
                placeholder="**********"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input" 
              />

            </div>

            <button 
              className="btn w-full rounded-md"
              disabled={loading}
              type="submit"
            >
              {loading ?
               ("Loading ....")
                :
               ("submit")
              }
            </button>

            {error && (

              <Alert color='failure'>{error}</Alert>

            )}

            {success && (

              <Alert color="success" className="cursor-pointer">
                
                <Link to="/sign-in">{success}</Link>

              </Alert>

            )}

          </form>
        </div>

      </div>

    </div>

  )

}
