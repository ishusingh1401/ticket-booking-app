const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email'],
    },
    name: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('user', userSchema);

module.exports = { User };