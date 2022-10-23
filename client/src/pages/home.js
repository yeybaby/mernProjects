import React, { useContext, useEffect } from 'react'
import '../pagesCSS/home.css'
import admin_logo from '../admin-logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context'
import { useHistory } from 'react-router-dom'


export default function Home() {

  const [user,setUsernameAndPass] = useState({username:"", password: ""});
  const {isAuth, setisAuth} = useContext(AppContext)
  const navigate = useNavigate();
  

  useEffect(() => {
    if(isAuth) navigate('/qrattendance');
    console.log(isAuth)
  },[isAuth])

  function handleLoginSubmit(e){
    e.preventDefault();
    fetch('/login',{
      method: 'POST',
      body: JSON.stringify({
        username: user.username,
        password: user.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.token) {
        window.localStorage.setItem('token',data.token);
        setisAuth(true);
        navigate('/qrattendance')
      }
      else {
        alert(data.data)
        setUsernameAndPass({...user, password:""})
      }
      
    })
  }

  return (
    <div className='home'>
      <div className='header'>
        <p>Employee Attendance System Using Qr Scan</p>
      </div>
      <div className='form-container'>
        <form className='form' onSubmit={handleLoginSubmit}>
          <img src={admin_logo} className="admin-logo"/>
          <div className='input-container'>
          <input type='text' placeholder='Enter your username'  value={user.username} onChange={e => setUsernameAndPass({...user, username: e.target.value})}></input>
          <input type='password' placeholder='Enter your password'  value={user.password} onChange={e => setUsernameAndPass({...user, password: e.target.value})}></input>
          </div>
          <button id='login-button'>Login</button>
        </form>
      </div>
    </div>
  )
}
