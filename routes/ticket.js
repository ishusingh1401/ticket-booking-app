const express = require('express');
const router = express.Router();

router.post('/create', (req, res) => {
    // TODO: Implement Login
    res.send('Login Successful');    
})

router.get('/viewOpen', (req, res) => {
    // TODO: Implement Signup
    res.send('Signup Done');    
})

router.get('/viewClosed', (req, res) => {
    // TODO: Implement Signup
    res.send('Signup Done');    
})

router.get('/:ticketId', (req, res) => {
    // TODO: Implement Signup
    res.send('Signup Done');    
})

router.put('/:ticketId', (req, res) => {
    // TODO: Implement Signup
    res.send('Signup Done');    
})

module.exports = router;