

import React from 'react'
import {useSelector} from "react-redux"
import {Navigate ,Outlet} from "react-router-dom"



export default function OnlyWriter() {

    const {currentUser} = useSelector((state) => state.user)


  return currentUser && currentUser.accountType === "writer" ?
    (
        <Outlet/>
    )
    :
    (
        <Navigate to="/" />
    )

}
