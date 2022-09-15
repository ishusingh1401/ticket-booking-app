const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    seatId: {
        type: Number,
        required: true,
        min: 1,
        max: 40,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    passengerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    isBooked: { 
        type: Boolean, 
        default: true 
    },
});

const Ticket = mongoose.model('ticket', ticketSchema);

module.exports = { Ticket };