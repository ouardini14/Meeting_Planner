const mongoose = require("mongoose");
const Room = require("./Room");
const Meeting = require("./Meeting");


const ReservationSchema = new mongoose.Schema({
  Name: {
    type: String,
    index: { unique: true },
    uppercase: true,
    trim: true
  },
  Nbr_participants: Number,
  Date: Date, //yyyy-mm-dd
  StartTime: Number,
  EndTime: Number,

  meeting_type: String,
  Room_name: String

})

ReservationSchema.virtual('meeting', {
  ref: 'Meeting',
  localField: 'meeting_type',
  foreignField: 'Name',
  justOne: true,
});

ReservationSchema.virtual('room', {
  ref: 'Room',
  localField: 'Room_name',
  foreignField: 'Name',
  justOne: true,
});


//Checks the meeting if exists
ReservationSchema.pre('save', async function (next) {
  try {
    const meeting = await Meeting.findOne({ Name: this.meeting_type });
    if (!meeting) {
      throw new Error('meeting type does not exist');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Reservation = mongoose.model("Reservation", ReservationSchema)
module.exports = Reservation