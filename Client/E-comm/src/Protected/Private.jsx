import React from 'react'
import { Navigate, Outlet } from 'react-router'

const Private = () => {
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken){
        return <Navigate to="/" replace/>
    }
  return (
    <Outlet />
  )
}

export default Private