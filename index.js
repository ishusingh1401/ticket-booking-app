const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const DB = 'mongodb+srv://diva-ishu:admin123@cluster1.mxslywy.mongodb.net/?retryWrites=true&w=majority';

const admin = require('./routes/admin');
const passenger = require('./routes/passenger');
const ticket = require('./routes/ticket');

//TODO: Create DB Conncetion
async function connectDB() {
    try {
        const connection = await mongoose.connect(DB);
        console.log('DB connected');
    } catch (e) {
        console.error('DB Connection failed', e);
    }
}
connectDB().then(() => console.log('Application Started'));

app.use(express.json());

// Adding Routes
app.use('/api/admin', admin);
app.use('/api/passenger', passenger);
app.use('/api/ticket', ticket);

app.listen(PORT, () => {
    console.log(`App running on: ${PORT}`);
})



