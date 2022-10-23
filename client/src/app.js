import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/home.js';
import Admin from './pages/admin.js';

export default function app() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
  )
}
