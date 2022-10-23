const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String ,
        required: true ,
    },
    firstName: {
        type: String , 
        required: true,
    },
    lastName: {
        type: String ,
        required: true
    },
    age: {
        type: Number ,
        required: true
    },
    position: {
        type: String ,
        required: true
    },
    qrurl: {
        type: String
    }
    
});

const employee = mongoose.model('Employee',EmployeeSchema);
module.exports = employee;