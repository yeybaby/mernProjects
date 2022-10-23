import React, { useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './pages/Home.js';
import SystemApp from './components/SystemApp.js';
import ProtectedRoute from './pages/ProtectedRoute.js';
import { AppContext } from './context.js';
import QrAttendance from './pages/QrAttendance.js';
import Employees from './pages/Employees.js';
import AddEmployee from './pages/AddEmployee.js';


export default function App() {

  const [isAuth,setisAuth] = useState(false);
  
  
  return (
    <AppContext.Provider value={{isAuth,setisAuth}}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
    
    <Route element={<ProtectedRoute/>}>
      
    <Route path='/qrattendance' element={<QrAttendance/>}/>
    <Route path='/employees' element={<Employees/>}/>
    <Route path='/addemployee' element={<AddEmployee/>}/>

    </Route>
    
    </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  )
}
