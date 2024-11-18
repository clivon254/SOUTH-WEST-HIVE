

import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Toaster} from "sonner"
import Header from './components/Header'
import FooterComp from './components/FooterComp'
import Home from './pages/Home'
import OnlyWriters from './components/OnlyWriters'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import Articles from './pages/Articles'
import Podcasts from './pages/Podcasts'
import Shop from './pages/Shop'
import LaElite from './pages/LaElite'


export default function App() {

  
  return (

    <BrowserRouter>

      <Toaster richColors/>

      <main className="min-h-screen w-full flex flex-col">

        <Header />

        <div className="flex-1 pt-20 lg:pt-40">

          <Routes>

            <Route path="/" element={<Home/>}/>

            <Route path="/sign-in" element={<SignIn/>}/>

            <Route path="/profile" element={<Profile/>}/>

            <Route path="/sign-up" element={<SignUp/>}/>

            <Route path="/forgot-password" element={<ForgotPassword/>}/>

            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

            <Route path="/articles" element={<Articles/>}/>

            <Route path="/podcasts" element={<Podcasts/>}/>

            <Route path="/shop" element={<Shop/>}/>

            <Route path="/la elite" element={<LaElite/>}/>

          </Routes>

        </div>

        <FooterComp />

      </main>

    </BrowserRouter>

  )

}
