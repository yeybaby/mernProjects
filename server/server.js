const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/Admin.js');
const cookieParser = require('cookie-parser');
const validateToken = require('./middlewares/validateToken.js')
const jwt = require('jsonwebtoken');
const admin = require('./models/Admin.js');
const employee = require('./models/Employee.js');
const qr = require('qrcode');
const employeeAttendance = require('./models/EmployeeAttendance.js');
//const time = require('time-now');


const jwtSecretKey = "daksfj151kjhesdf717c53y8pru[o'a;cfkhl";

    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/synari_space', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`CONNECTED TO MONGO!`);
    })
    .catch((err) => {
        console.log(`OH NO! MONGO CONNECTION ERROR!`);
        console.log(err);
    });

    app.get('/a', (req, res) => {
        res.json({message: "hello"});
    })

    

    // to validate login
    app.post('/login', async (req, res) => {
        const {username, password} = req.body;
    
        const user = await User.findOne({username});  
        //if user does not exist return this
        if(user === null){
            return res.json({
            status: "error",
            data: "wrong username or password"
        });
    }

        const result = await bcrypt.compare(password, user.password);
        if(result){
            const token = jwt.sign({},jwtSecretKey);
            return res.json({
                status: 'ok',
                token
            })
        }
        else{
            res.json({
                status: "error",
                data: "wrong username or password"
            })
        }
    });

    
    app.post('/verify', (req, res) => {
        const {token} = req.body;
        if(jwt.verify(token,jwtSecretKey)){
            res.json({isAuth: true})
        }else{
            res.json({isAuth: false})
        }
    })

    app.get('/employeeList', (req, res) => {
        employee.find().then(data => res.send(data));
    })

    app.post('/addemployee', (req, res) => {
        const {name, firstName, lastName, age, position} = req.body;
        employee.create({
            name,
            firstName,
            lastName,
            age,
            position
        })
        .then((data) => {
            qr.toDataURL(data._id.toHexString(), { errorCorrectionLevel: 'M' },(err, url) => {
                if(err) {
                    console.log('invalid string input');
                    return;
                }
                employee.findByIdAndUpdate(data._id.toHexString(), {qrurl: url})
                .then(() => {
                    res.json({status: "ok", message: "Employee added successfully", qrurl: url});
                })
            })
        })
    })

    app.delete('/deleteemployee', (req, res) => {
        const {id} = req.body;
        employee.findByIdAndDelete(id).
        then(() => res.json({status: 'ok', message: "Employee is deleted successfully"}))
    })

    app.post('/recordattendance', (req, res) => {
        const {id, name, firstName, lastName, position, timeIn, empId} = req.body;
        employeeAttendance.create({
            name,
            firstName,
            lastName,
            position,
            timeIn,
            id,
            empId
        })
        .catch(err => {
                res.json({
                status: "error",
                message: err.name
            })
        });

        res.json({
            status:"ok",
            message:"attendance successfully added"
        })
    })

    app.get('/getemployee/:id', async (req, res) => {
        
        const {id} = req.params;
        const response = await employee.findById(id)
        .catch(err => {
            res.json({
                status: "error",
                message: err.name
            })
        })
        if(response){
        res.json({name:response.name, firstName:response.firstName, lastName:response.lastName, position:response.position});
        }
    })


    // employee.create({
    //     name: "James Patrick Jose",
    //     firstName: "James Patrick",
    //     lastName: "Jose",
    //     age: "21",
    //     position: "unknown"
    // })
    
    // employee.find().then(data => console.log(data))

  console.log(new Date().getHours())


app.listen(8080, () => {
    console.log("listening to port 8080");
});