
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import {Toaster} from "sonner"
import { useSelector } from "react-redux"
import ForgotPassword from './pages/ForgotPassword'
import SignIn from './pages/SignIn'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Analytic from './pages/Analytic'
import AddPost from './pages/AddPost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import WriterPage from './pages/WriterPage'
import AddMerch from './pages/AddMerch'
import UpdateMerch from './pages/UpdateMerch'
import MerchPage from './pages/MerchPage'
import Posts from './pages/Posts'
import Merch from './pages/Merch'
import AddFood from './pages/AddFood'
import UpdateFood from './pages/UpdateFood'
import FoodPage from './pages/FoodPage'
import Food from './pages/Food'
import AddAccess from './pages/AddAccess'
import UpdateAccess from './pages/UpdateAccess'
import AccessPage from './pages/AccessPage'
import Access from './pages/Access'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Profile from './pages/Profile'
import Coupon from './pages/Coupon'
import Users from './pages/Users'

function Layout(){

  const {currentUser} = useSelector(state => state.user)

  return(

    currentUser ? 

      <div className=""></div>
      :
      <Navigate to="sign-in"/>
  )

}

export default function App() {


  return (
   
    <BrowserRouter>

      <div className="w-full min-h-screen">

        <Toaster richColors/>

        <Routes>

          <Route element={<Layout/>}>

              <Route path="/" element={<Dashboard/>}/>

              <Route path="/analytic" element={<Analytic/>}/>

              <Route path="/add-post" element={<AddPost/>}/>

              <Route path="/update-post/:slug" element={<UpdatePost/>}/>

              <Route path="/post/:slug" element={<PostPage/>}/>

              <Route path="/posts" element={<Posts/>}/>

              <Route path="/write-page/:userId" element={<WriterPage/>}/>

              <Route path="/add-merch" element={<AddMerch/>}/>

              <Route path="/update-merch/:merchId" element={<UpdateMerch/>}/>

              <Route path="/product/:merchId" element={<MerchPage/>}/>

              <Route path="/merchs" element={<Merch/>}/>

              <Route path="/add-food" element={<AddFood/>}/>

              <Route path="/update-food/:foodId" element={<UpdateFood/>}/>

              <Route path="/product/:food" element={<FoodPage/>}/>

              <Route path="/food" element={<Food/>}/>

              <Route path="/add-access" element={<AddAccess/>}/>

              <Route path="/update-access/:accessId" element={<UpdateAccess/>}/>

              <Route path="/product/:accessId" element={<AccessPage/>}/>

              <Route path="/access" element={<Access/>}/>

              <Route path="/cart" element={<Cart/>}/>

              <Route path="/CheckOut" element={<CheckOut/>}/>

              <Route path="/Profile/:userId" element={<Profile/>}/>

              <Route path="/coupon" element={<Coupon/>}/>

              <Route path="/users" element={<Users/>}/>

          </Route>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          <Route path="/sign-in" element={<SignIn/>}/>

        </Routes>

      </div>

    </BrowserRouter>

  )
}


