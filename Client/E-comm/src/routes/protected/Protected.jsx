import React from 'react'
import {Navigate, Outlet} from 'react-router'
const Protected = () => {

    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken){
        return <Navigate to="/" replace/>
    }
    return <Outlet />
}

export default Protected