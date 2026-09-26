import React from 'react'
import { Navigate, Outlet } from 'react-router'

const Public = () => {

    const accessToken = localStorage.getItem("accessToken")
    if(accessToken){
        return <Navigate to="/products" replace/>
    }
  return (
    <Outlet />
  )
}

export default Public