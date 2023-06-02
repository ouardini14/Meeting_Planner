const mongoose = require("mongoose");
const Reservation = require("./Reservation");

const RoomSchema = new mongoose.Schema({
    Name: {
        type: String,
        uppercase: true,
        trim: true,
        index: { unique: true }
    },
    Capacity: Number,
    Tools: [String]
})

//Delete all reservations linked to deleted room
RoomSchema.pre('deleteOne', { document: false, query: true }, async function (next) {
    const room = await this.model.findOne(this.getFilter());
    await Reservation.deleteMany({ Room_name: room.Name }).exec();
    next();
});



const Room = mongoose.model("Room", RoomSchema)
module.exports = Room