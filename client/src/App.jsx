

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
import PostPage from './pages/PostPage'
import Catergory from './pages/Catergory'
import WriterPage from './pages/WriterPage'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Orders from './pages/orders'
import ConfirmPayment from './pages/ConfirmPayment'



export default function App() {

  
  return (

    <BrowserRouter>

      <Toaster richColors/>

      <main className="min-h-screen w-full flex flex-col">

        <Header />

        <div className="flex-1 ">

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

            <Route path="/post/:slug" element={<PostPage/>}/>

            <Route path="/la elite" element={<LaElite/>}/>

            <Route path="/category" element={<Catergory/>}/>

            <Route path="/product/:productId" element={<ProductPage/>}/>

            <Route path="/writer/:userId" element={<WriterPage/>}/>

            <Route path="/cart" element={<Cart/>}/>

            <Route path="/checkout" element={<CheckOut/>}/>

            <Route path="/confirm-payment/:CheckoutRequestID/:orderId" element={<ConfirmPayment/>}/>

            <Route path="/orders" element={<Orders/>}/>

          </Routes>

        </div>

        <FooterComp />

      </main>

    </BrowserRouter>

  )

}
