const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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

const model = mongoose.model('User', UserSchema);
module.exports = model;