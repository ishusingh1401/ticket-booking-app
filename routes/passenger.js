const express = require('express');
const router = express.Router();

router.get('/:ticketId', (req, res) => {
    // TODO: Implement Login
    res.send('Login Successful');    
})


module.exports = router;