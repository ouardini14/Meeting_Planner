const mongoose = require("mongoose");
const Reservation = require("./Reservation");


const MeetingSchema = new mongoose.Schema({
    Name: {
        type: String,
        uppercase: true,
        trim: true,
        index: { unique: true }
    },
    Capacity: {
        type: Number,
        required: false
    },
    Tools: [String]
})

const Meeting = mongoose.model("Meeting", MeetingSchema)
module.exports = Meeting

