

import React from 'react'
import {useSelector} from "react-redux"
import {Navigate ,Outlet} from "react-router-dom"



export default function OnlyWriters() {

    const {currentUser} = useSelector((state) => state.user)


  return currentUser && currentUser.accountType === "Salesperson" ?
    (
        <Outlet/>
    )
    :
    (
        <Navigate to="/" />
    )

}