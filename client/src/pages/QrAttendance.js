import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import SystemApp from '../components/SystemApp'
import '../pagesCSS/qrattendance.css'
import xButton from '../components/x_button.png'


export default function QrAttendance() {

    const [result, setResult] = useState();
    const [cantDetect, setcantDetect] = useState(true);
    const [inoutActive, setinoutActive] = useState();
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes() <= 10 ?"0"+date.getMinutes():date.getMinutes();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const inoutTime = useRef();
    const reader = useRef()

      const timeInOUtClick = (e) => {
        setinoutActive(e.target.classList[1]);
      }

      const toggleTimePopup = () => {
        inoutTime.current.style.display = inoutTime.current.style.display !== 'flex' ? 'flex':  'none';
        console.log("this is toggletimepopup function")
      }

      const recordAttendance = async (id) => {

        const response = await fetch(`/getemployee/${id}`)
        .then(data => data.json())
        .then(async (response) => {

          if(response.status === "error"){
            alert("qr does not exist");
            window.location.reload();
            return;
          }

          const result = await fetch('/recordattendance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },  
            body: JSON.stringify({
              id, name: response.name, firstName: response.firstName, lastName: response.lastName, position: response.position, timeIn: hours+":"+minutes, type:inoutActive, empId: id
            })
          })

          if(result.status === "error"){
            console.log("should refresh");
            return;
          }
          toggleTimePopup();

        });
        


        
      }

      const resumeScanning = () => {
        toggleTimePopup();
        window.location.reload();
        //reader.current.style.display = 'block';
      }


      const inoutSelector = () => {
        if(inoutActive === 'in'){
          return 'Time-in';
        }
        else if(inoutActive === 'out'){
          return 'Time-out';
        }
        else {
          return 'please select Time in or Time out button'
        }
      }


      useEffect(() => {
        
        function onScanSuccess(decodedText, decodedResult) {
          //setcantDetect(false);
          setResult("");
          //html5QrcodeScanner.clear()
          html5QrcodeScanner.clear();
          recordAttendance(decodedText);
          // handle the scanned code as you like, for example:
          //console.log(`Code matched = ${decodedText}`, JSON.stringify(decodedResult));
        }
        
        function onScanFailure(error) {
          // handle scan failure, usually better to ignore and keep scanning.
          // for example:
          // setcantDetect(true);
          setResult("cant detect qr code")
          // setResult("cant detect the qr code")
        }
        
        let html5QrcodeScanner = new Html5QrcodeScanner(
          "reader",
          { fps: 10, qrbox: {width: 250, height: 250} },
          /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      },[]);

      useEffect(() => {
        const inout = document.querySelectorAll('.in-out-btn');

        inout.forEach((e) => {
          if(e.classList.contains(inoutActive)){
            e.classList.add('active');
            //e.style.borderColor = inoutActive === 'in' ? 'green' : 'red';
          }
          else {
            e.classList.remove('active');
          }
        })
      },[inoutActive])


  return (
    <div className='system-app'>
      <SystemApp/>
      <div className='nav-content'>

        <div className='in-out-btn-container'>
          <button className='in-out-btn in' onClick={timeInOUtClick}>Time In</button>
          <button className='in-out-btn out' onClick={timeInOUtClick}>Time Out</button>
        </div>

        <div className='system-app-header'>
        <p>Employee Attendance System Using Qr Scan</p>
        </div>
        
        <main>

            <div className='qr-reader'>
                <div style={{"width":"500px"}} id="reader" ref={reader}> </div>
                
                <div id='result'>
                    <h3>{result}</h3>
                </div>    

                <div className='in-out-time' ref={inoutTime}>
                  <img src={xButton} onClick={() => resumeScanning()}/>
                  <h3>Attendance Recorded</h3>
                  <h4>{inoutSelector()}</h4>
                  <p>{hours}:{minutes} {hours < 12 ? 'AM': 'PM'}</p>
                </div>

            </div>

  
        </main>

      </div>
    
    </div>
  )
}
