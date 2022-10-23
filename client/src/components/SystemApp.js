import React, { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context'
import { useNavigate } from 'react-router-dom'
import '../pagesCSS/systemapp.css'
import logo from './your-logo-here.png'

export default function SystemApp() {
  const {isAuth, setisAuth} = useContext(AppContext)
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(window.location.pathname.substring(1));

  const navItemClick = (e) => {
    e.preventDefault();
    setActiveItem(e.target.classList[1]);
  }

  useEffect(() => {
    console.log(window.location.pathname.substring(1))
    //select all elements that have .nav-item classname
    let navItems = document.querySelectorAll('.nav-item');
    //every render we will check every element of navItems if it is the is the element in state(active),
    //if active we will add a classname to it named "active"
    //else we will remove active class to other element that is not in the activeItemState
    navItems.forEach((e) => {
      if(e.classList.contains(activeItem)){
        e.classList.add('active');
        e.style.color = "black"
      }
      else{
        e.classList.remove('active')
        e.style.color = "#e23652"
      }
    })
  },[activeItem])

  return (
    
      <>
      <div className='side-navbar'>
        <img src={logo} className='side-navbar-logo'/>
        <ul>
          <li><a className='nav-item qrattendance' onClick={(e) => {
            navigate('/qrattendance');
            navItemClick(e);
          }}>QR ATTENDANCE</a></li>

          <li><a className='nav-item employees' onClick={(e) => {
            navigate('/employees');
            navItemClick(e);
          }}>EMPLOYEES</a></li>

          <li><a className='nav-item addemployee' onClick={(e) => {
            navigate('/addemployee');
            navItemClick(e);
          }}>ADD EMPLOYEE</a></li>

          <li><a className='nav-item attendance-record' onClick={(e) => {
            navigate('/attendancerecord');
            navItemClick(e);
          }}>ATTENDANCE RECORD</a></li>
        </ul>
      </div>

      </>
      
     
    
  )
}
