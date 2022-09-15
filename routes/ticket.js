const express = require('express');
const { Ticket } = require('../models/ticket');
const { User } = require('../models/user');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        
        if (parseInt(req.body.seatID) > 40) {
            return res.status(400).send("Invalid SeatID. There are only 40 seats in the Bus!");
        }

        let exists = await Ticket.findOne({
            isBooked: true,
            seatID: req.body.seatID
        });

        if (exists) {
            return res.status(400).send("The seat you are looking for is already booked");
        }

        const user = new User(req.body.passenger);
        const userData = await user.save();

        if (userData) {
            const ticket = new Ticket()
            ticket.seatID = req.body.seatID
            ticket.passengerId = user._id;
            const ticketData = await ticket.save();
            if (ticketData) {
                res.status(200).send(ticketData);
            }
        }
    } catch (err) {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
});


router.get('/viewOpen', async (req, res) => {
    try {
        
        const data = await Ticket.find({
            isBooked: false
        });
        return res.status(200).send(data);
    } catch {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
})

router.get('/viewClosed', async (req, res) => {
    try {
       
        const data = await Ticket.find({
            isBooked: true
        });
        return res.status(200).send(data);
    } catch {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
})


router.get('/:ticketId', async (req, res) => {
    try {
        
        const { ticketId } = req.params;
        
        const ticketData = await Ticket.findById(ticketId);
        
        if (ticketData) {
            return res.status(200).json({
                isBooked: ticketData.isBooked
            });
        }
        else{
            return res.status(404).json({
                "message": "Ticket ID is incorrect!"
            })
        }
    } catch (err) {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
})


router.put('/:ticketId', async (req, res) => {
    try {
        
        const { ticketId } = req.params;
        
        const ticketData = await Ticket.findByIdAndUpdate(ticketId, {
            $set: { isBooked: req.body.isBooked }},
            {new: true}
        );
        if(!ticketData){
            return res.status(404).json({
                "message": "Ticket ID is incorrect!"
            })
        }
    
        const passengerId = ticketData.passengerId
        await User.findByIdAndUpdate(passengerId, 
            { $set: req.body.passenger }, 
            { new: true }, 
        );
        res.json({
            "message":"Successfully Updated Details!"
        })
    } catch (err) {
        console.log("ERROR:: ", err)
        return res.status(403).send("Unknown Error!");
    }
});

module.exports = router;