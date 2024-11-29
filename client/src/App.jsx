

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
import Food from './pages/Food'
import UpdateFood from './pages/UpdateFood'
import AddFood from './pages/AddFood'
import Brand from './pages/Brands'
import AddBrand from './pages/AddBrand'
import UpdateBrand from './pages/UpdateBrand'
import AddMerch from './pages/AddMerch'
import UpdateMerch from './pages/UpdateMerch'
import Merch from './pages/Merch'
import AddAccess from './pages/AddAccess'
import UpdateAccess from './pages/UpdateAccess'
import Access from './pages/Access'
import Podcast from './pages/Podcast'
import UpdatePodcast from './pages/UpdatePodcast'
import AddPodcast from './pages/AddPodcast'
import Reel from './pages/Reel'
import UpdateReel from './pages/UpdateReel'
import AddReels from './pages/AddReels'
import AddFilm from './pages/AddFilm'
import UpdateFilm from './pages/UpdateFilm'
import Films from './pages/Film'
import Dashboard from './pages/Dashboard'



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
            
            <Route path="/dashboard" element={<Dashboard/>}/>

            <Route  element={<OnlyCaterer/>}>
              
              <Route path="/add-food" element={<AddFood/>}/>

              <Route path="/update-food/:foodId" element={<UpdateFood/>}/>

              <Route path="/food" element={<Food/>}/>

            </Route>

            <Route  element={<OnlySalesperson/>}>
              
              <Route path="/brand" element={<Brand/>}/>

              <Route path="/update-brand/:brandId" element={<UpdateBrand/>}/>

              <Route path="/add-brand" element={<AddBrand/>}/>

              <Route path="/merch" element={<Merch/>}/>

              <Route path="/update-merch/:merchId" element={<UpdateMerch/>}/>

              <Route path="/add-merch" element={<AddMerch/>}/>

              <Route path="/access" element={<Access/>}/>

              <Route path="/update-access/:accessId" element={<UpdateAccess/>}/>

              <Route path="/add-access" element={<AddAccess/>}/>

                
            </Route>

            <Route  element={<OnlyWriter/>}>

              <Route path="/posts" element={<Posts/>}/>

              <Route path="/update-post/:slug" element={<UpdatePost/>}/>

              <Route path="/add-post" element={<AddPost/>}/>

            </Route>

            <Route  element={<OnlyMedia/>}>

                <Route path="/podcast" element={<Podcast/>}/>

                <Route path="/update-podcast/:podcastId" element={<UpdatePodcast/>}/>

                <Route path="/add-podcast" element={<AddPodcast/>}/>

                <Route path="/reel" element={<Reel/>}/>

                <Route path="/update-reel/:reelId" element={<UpdateReel/>}/>

                <Route path="/add-reel" element={<AddReels/>}/>

                <Route path="/film" element={<Films/>}/>

                <Route path="/update-film/:filmId" element={<UpdateFilm/>}/>

                <Route path="/add-film" element={<AddFilm/>}/>

            </Route>

          </Routes>

        </div>

        <FooterComp />

      </main>

    </BrowserRouter>

  )

}
