const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    // TODO: Implement Login
    res.send('Login Successful');    
})

router.post('/signup', (req, res) => {
    // TODO: Implement Signup
    res.send('Signup Done');    
})

router.post('/reset', (req, res) => {
    // TODO: Implement Reset
    res.send('Reset Done');    
})

module.exports = router;