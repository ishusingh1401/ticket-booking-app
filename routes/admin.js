const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const httpStatus = require('http-status');
const {auth, adminCheck} = require('../utils')


router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });
    
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).send('Email not found');
        }
    
        const checkPswd = await bcrypt.compare(
            req.body.password, 
            user.password
        )

        if (!checkPswd) {
            return res.status(httpStatus.UNAUTHORIZED)
                .send('Password Incorrect');
        }
    
        const token = jwt.sign({
            id: user._id, 
            isAdmin: user.isAdmin
        }, 'mySecretKey');

        res.header('x-auth-header', token)
            .status(httpStatus.OK)
            .json({message: 'Login successful'});
    } catch (e) {
        console.error('Error recieved', e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .send('Internal Server Error');
    }
})

router.post('/signup', async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });
    
        if (user) {
            return res.status(httpStatus.CONFLICT).send('Email already exists');
        }
    
        const salt = await bcrypt.genSalt(10);
        const pswd = await bcrypt.hash(req.body.password, salt);
    
        user = new User({
            email: req.body.email,
            name: req.body.name,
            sex: req.body.sex,
            age: req.body.age,
            isAdmin: req.body.isAdmin,
            password: pswd,
        });
    
        const data = await user.save();
    
        const token = jwt.sign({
            id: data._id, 
            isAdmin: data.isAdmin
        }, 'mySecretKey');
    
        res.header('x-auth-header', token)
            .status(httpStatus.OK)
            .json({message: 'Signup successful', token});     
    } catch (e) {
        console.error('Error recieved', e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .send('Internal Server Error');
    }
})

router.post('/reset', [auth, adminCheck], async (req, res) => {
    try {
        await Ticket.updateMany({}, {
            $set: {
                isBooked: false
            }
        });

        return res.status(httpStatus.OK).json({
            "message":"Successfully reset all seats."
        });
    } catch (e) {
        console.error('Error recieved', e);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR)
            .send('Internal Server Error');
    }
})

module.exports = router;