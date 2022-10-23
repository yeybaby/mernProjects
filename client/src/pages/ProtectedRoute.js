import React, { useContext, useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import App from '../app.js';
import { AppContext } from '../context.js';


export default  function ProtectedRoute() {
    const {isAuth, setisAuth} = useContext(AppContext);
    useEffect(() => {
        fetch('/verify',{
            method: 'POST',
            body: JSON.stringify({
                token: window.localStorage.getItem('token')
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(data => {
            if(data.isAuth){
                setisAuth(true)
            }
        });
    },[])
    
    
    
    
  return ( 
    isAuth? <Outlet/>: <Navigate to='/'/>
  )
}
