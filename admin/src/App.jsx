

import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom"
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
import Posts from './pages/Posts'
import Merch from './pages/Merch'
import AddFood from './pages/AddFood'
import UpdateFood from './pages/UpdateFood'
import Food from './pages/Food'
import AddAccess from './pages/AddAccess'
import UpdateAccess from './pages/UpdateAccess'
import Access from './pages/Access'
import Cart from './pages/Cart'
import CheckOut from './pages/CheckOut'
import Profile from './pages/Profile'
import Coupon from './pages/Coupon'
import Users from './pages/Users'
import Header from './components/Header'
import DashSidebar from './components/DashSidebar'
import ProductPage from "./pages/ProductPage"
import AddReels from "./pages/AddReels"
import UpdateReel from "./pages/UpdateReel"
import Reels from "./pages/Reels"
import AddFilm from "./pages/AddFilm"
import Films from "./pages/Films"
import UpdateFilm from "./pages/UpdateFilm"
import AddBrand from "./pages/AddBrand"
import UpdateBrand from "./pages/UpdateBrand"
import Brands from "./pages/Brands"
import UpdateUser from "./pages/UpdateUser"
import AddPodcast from "./pages/AddPodcast"
import Podcast from "./pages/Podcast"
import UpdatePodcast from "./pages/UpdatePodcast"
import LandingPage from "./pages/LandingPage"
import Orders from "./pages/Orders"
import { useContext } from "react"
import { StoreContext } from "./context/store"



function Layout(){

  const {currentUser} = useSelector(state => state.user)

  const {token} = useContext(StoreContext)

  return(

    currentUser?.isAdmin  &&  token ? 

    <div className="w-full h-screen flex flex-col">

      <Header />
    
      <div className="w-full h-full flex border-t pt-24">

        {/* sidebar */}
        <aside className="hidden lg:flex mb-5 overflow-y-scroll">

          <DashSidebar />

        </aside>
        
        {/* otherside */}
        <div className="w-full flex-1 overflow-y-scroll">

            <Outlet/>
            
        </div>

      </div>

    </div>
      :
    <Navigate to="/landing-page"/>
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

              <Route path="/merch" element={<Merch/>}/>

              <Route path="/add-food" element={<AddFood/>}/>

              <Route path="/update-food/:foodId" element={<UpdateFood/>}/>

              <Route path="/foods" element={<Food/>}/>

              <Route path="/add-access" element={<AddAccess/>}/>

              <Route path="/update-access/:accessId" element={<UpdateAccess/>}/>

              <Route path="/access" element={<Access/>}/>

              <Route path="/product/:productId" element={<ProductPage/>}/>

              <Route path="/cart" element={<Cart/>}/>

              <Route path="/CheckOut" element={<CheckOut/>}/>

              <Route path="/Profile" element={<Profile/>}/>

              <Route path="/coupon" element={<Coupon/>}/>

              <Route path="/users" element={<Users/>}/>

              <Route path="/update-user/:userId" element={<UpdateUser/>}/>

              <Route path="/add-reel" element={<AddReels/>}/>

              <Route path="/update-reel/:reelId" element={<UpdateReel/>}/>

              <Route path="/reels" element={<Reels/>}/>

              <Route path="/add-film" element={<AddFilm/>}/>

              <Route path="/update-film/:filmId" element={<UpdateFilm/>}/>

              <Route path="/film" element={<Films/>}/>

              <Route path="/add-brand" element={<AddBrand/>}/>

              <Route path="/update-brand/:brandId" element={<UpdateBrand/>}/>

              <Route path="/brand" element={<Brands/>}/>

              <Route path="/add-podcast" element={<AddPodcast/>}/>

              <Route path="/podcast" element={<Podcast/>}/>

              <Route path="/orders" element={<Orders/>}/>

              <Route path="/update-podcast/:podcastId" element={<UpdatePodcast/>}/>

          </Route>

          <Route path="/forgot-password" element={<ForgotPassword/>}/>

          <Route path="/reset-password/:token" element={<ResetPassword/>}/>

          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="/landing-page" element={<LandingPage/>}/>

        </Routes>

      </div>

    </BrowserRouter>

  )
}


