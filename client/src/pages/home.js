import React from 'react'
import '../pagesCSS/home.css'
import admin_logo from '../admin-logo.png'

export default function home() {

  function handleSubmit () {
    fetch('/a')
  }

  return (
    <div className='home'>
      <div className='header'>
        <p>Employee Attendance System Using Qr Scan</p>
      </div>
      <div className='form-container'>
        <form className='form' action='/login' method='post'>
          <img src={admin_logo} className="admin-logo"/>
          <div className='input-container'>
          <input type='text' placeholder='Enter your username' name='username'></input>
          <input type='password' placeholder='Enter your password' name='password'></input>
          </div>
          <button id='login-button'>Login</button>
        </form>
        <button onClick={() => handleSubmit()} type="button">api request</button>
      </div>
    </div>
  )
}
