

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
import Film from './pages/Films'
import Reels from './pages/Reels'
import UserPage from './pages/UserPage'
import Contact from './pages/Contact'
import About from './pages/About'
import FAQ from './pages/FAQ'
import OnlyCaterer from './components/OnlyCaterer'
import OnlyMedia from './components/OnlyMedia'
import OnlyWriter from './components/OnlyWriters'
import OnlySalesperson from './components/OnlySales'
import Posts from './pages/Posts'
import UpdatePost from './pages/UpdatePost'
import AddPost from './pages/AddPost'



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

            <Route path="/films" element={<Film/>}/>

            <Route path="/reels" element={<Reels/>}/>

            <Route path="/contact" element={<Contact/>}/>

            <Route path="/about" element={<About/>}/>

            <Route path="/faq" element={<FAQ/>}/>

            <Route path="/user/:userId" element={<UserPage/>}/>

            <Route  element={<OnlyCaterer/>}>

            

            </Route>

            <Route  element={<OnlySalesperson/>}>


            </Route>

            <Route  element={<OnlyWriter/>}>

                <Route path="/posts" element={<Posts/>}/>

                <Route path="/update-post/:slug" element={<UpdatePost/>}/>

                <Route path="/add-post" element={<AddPost/>}/>

            </Route>

            <Route  element={<OnlyMedia/>}>


            </Route>

          </Routes>

        </div>

        <FooterComp />

      </main>

    </BrowserRouter>

  )

}
