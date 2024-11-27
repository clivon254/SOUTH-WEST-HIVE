

import React, { useContext } from 'react'
import { StoreContext } from '../context/store'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from "react-icons/fc"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import axios from 'axios'
import { signInSuccess } from '../redux/user/userSlice'
import {toast} from "sonner"


export default function OAuth() {

    const {url ,token,setToken,fetchCart} = useContext(StoreContext)

    const auth = getAuth(app)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // handleGoogleClick
    const handleGoogleClick = async () => {

        try
        {
            const provider = new GoogleAuthProvider()

            provider.setCustomParameters({prompt:'select_account'})

            const resultsFromGoogle = await signInWithPopup(auth , provider)

            let data = {
                name:resultsFromGoogle.user.displayName,
                email:resultsFromGoogle.user.email,
                googlePhotoUrl:resultsFromGoogle.user.photoURL
            }

            const res = await axios.post(url + "/api/auth/google",data)
            
            if(res.data.success)
            {
                dispatch(signInSuccess(res.data.rest))

                localStorage.setItem("token", res.data.token)

                setToken(res.data.token)

                navigate('/')

                toast.success("You have signed in successfully")

                fetchCart()
            }

        }
        catch(error)
        {
            console.log(error.message)
        }

    }

  return (

    <button 
        className="flex items-center justify-center flex-row-reverse w-full gap-x-5 border border-zinc-700 dark:border-gray-200 rounded-md p-3 font-semibold font-title text-base"
        onClick={handleGoogleClick}
    >
        Sign in with Google <FcGoogle />
    </button>

  )

}
