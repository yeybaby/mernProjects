import React, { useEffect, useRef, useState } from 'react'
import SystemApp from '../components/SystemApp'
import '../pagesCSS/addemployee.css'
import SearchLogo from '../components/table-search-img.png'
import add from '../components/add-png.png'
import x_button from '../components/x_button.png'


export default function AddEmployee() {

    const [employeeList, setemployeeList] = useState([]);
    const [employee, setEmployee] = useState({
        name: "",
        firstName: "",
        lastName: "",
        age: "",
        position: ""
    });

    const darkBackground = useRef();
    const popup = useRef();

    const deleteEmployee = (id) => {
        fetch('/deleteemployee', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id
            })
        })
        .then(data => data.json())
        .then(data => {
            console.log(data.message)
        })
    }
    //for x button of popup form
    const toggleButton1 = () => {
        popup.current.style.display = popup.current.style.display !== "flex" ? "flex": "none";
        setEmployee({
            name: "",
            firstName: "",
            lastName: "",
            age: "",
            position: ""
        });
    }
    //for the qr overlay
    const toggleButton2 = () => {
        darkBackground.current.style.display = darkBackground.current.style.display !== "flex" ? "flex" : "none";
    }

    const setImgSrc = (url) => {
        const element = document.getElementsByClassName('qrcode')[0];
        element.src = url;
    }

    const formSubmit = (e) => {
        e.preventDefault();
        fetch('/addemployee',{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name: employee.name,
                firstName: employee.firstName,
                lastName: employee.lastName,
                age: employee.age,
                position: employee.position
            })
        })
        .then(data => data.json())
        .then((data) => {
            toggleButton1();
            setImgSrc(data.qrurl);
            toggleButton2();
            alert('employee added successfully')
        })
        .catch((err) => {
            alert(err);
            toggleButton1();
        })
        
    } 


    

  useEffect(() => {
    fetch('/employeeList').then(data => data.json()).then(data => setemployeeList(data))
  },[employeeList])


  return (
    <div className='system-app'>
        <SystemApp/>


        <div className='dark-background' ref={darkBackground}>
                <div className='generated-qrcode-container'>
                    <img src={x_button} onClick={toggleButton2}/>
                    <img className='qrcode'/>
                    <h1> PLEASE SAVE</h1>
                </div>
              </div>


        <div className='nav-content'>
            <div className='system-app-header'>Employee Attendance System Using Qr Scan</div>
            <main className='add-employee-main'>

                <div className='search-table'>
                    <div className='addemployee-search-container'>
                    <input placeholder='Search for Employee...'/>
                    <img src={SearchLogo} className='table-search-logo'/>
                    </div>
                <table className='table-container'>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Age</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                            employeeList.map((e) => {
                                return (
                                <tr key={e._id}>
                                <td>{e.name}</td>
                                <td>{e.firstName}</td>
                                <td>{e.lastName}</td>
                                <td>{e.age}</td>
                                <td>{e.position}</td>
                                <td>
                                    <button className='edit-button'>Edit</button>
                                    <button className='delete-button' onClick={() => deleteEmployee(e._id)}>Delete</button>
                                </td>
                                </tr>
                                )
                            })
                           
                        }
                    </tbody>
                         
                </table>

                
                <button className='add-employee-button' onClick={toggleButton1}>Add Employee</button>
                <div className='register-employee-overlay' ref={popup}>
                    <form className='popup-register-form' onSubmit={formSubmit}>
                        <img src={x_button} className='x-button' onClick={toggleButton1}/>
                    <div className='popup-form-container'>
                    <label >Name</label>
                    <input type='text' value={employee.name} onChange={e => setEmployee({...employee, name: e.target.value.toUpperCase()})} required></input>
                    <label>FirstName</label>
                    <input type='text' value={employee.firstName} onChange={e => setEmployee({...employee, firstName: e.target.value.toUpperCase()})} required></input>
                    <label>LastName</label>
                    <input type='text' value={employee.lastName} onChange={e => setEmployee({...employee, lastName: e.target.value.toUpperCase()})} required></input>
                    <label>Age</label>
                    <input type='number' value={employee.age} onChange={e => setEmployee({...employee, age: e.target.value.toUpperCase()})} required></input>
                    <label>Position</label>
                    <input type='text' value={employee.position} onChange={e => setEmployee({...employee, position: e.target.value.toUpperCase()})} required></input>
                    </div>
                    <button type='submit' className='add-button'>Add</button>
                    </form>
                </div>
                
                
                </div>
                
            </main>
        </div>
    </div>
  )
}
