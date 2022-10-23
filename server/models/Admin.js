const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

const admin = mongoose.model('Admin', AdminSchema);
module.exports = admin;