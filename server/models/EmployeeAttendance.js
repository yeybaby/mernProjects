const mongoose = require('mongoose');

const empAttendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    timeIn: {
        type: String
    },
    timeOut: {
        type: String
    },
    position: {
        type: String,
        required: true
    },
    empId: {
        type: String
    }
});

const employeeAttendance = mongoose.model('employeeAttendance', empAttendanceSchema);
module.exports = employeeAttendance;