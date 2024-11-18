

import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Toaster} from "sonner"
import Header from './components/Header'
import FooterComp from './components/FooterComp'
import Home from './pages/Home'
import OnlyWriters from './components/OnlyWriters'


export default function App() {

  return (

    <BrowserRouter>

      <Toaster richColors/>

      <main className="min-h-screen w-full flex flex-col">

        <Header />

        <div className="flex-1">

          <Routes>

            <Route path="/" element={<Home/>}/>

             

          </Routes>

        </div>

        <FooterComp />

      </main>

    </BrowserRouter>

  )

}
