const express = require('express');
const app = express();
const PORT = 3000;

const admin = require('./routes/admin');
const passenger = require('./routes/passenger');
const ticket = require('./routes/ticket');

//TODO: Create DB Conncetion

//TODO: add middlewares

// Adding Routes
app.use('/api/admin', admin);
app.use('/api/passenger', passenger);
app.use('/api/ticket', ticket);

app.listen(PORT, () => {
    console.log(`App running on: ${PORT}`);
})



