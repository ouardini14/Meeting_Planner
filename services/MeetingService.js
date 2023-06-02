const Meeting = require("../models/Meeting")

const getMeetings = async (args) => {
   return await Meeting.find().skip(args.start ? args.start : null).limit(args.qt ? args.qt : null);
}

const addMeeting = async (meeting) => {
   return await Meeting.create(meeting);
}

const getMeetingByName = async (name) => {
   return await Meeting.findOne({ Name: name })
}

const deleteMeeting = async (name) => {
   return await Meeting.deleteOne({ Name: name })
}

const updateMeeting = async (name, meeting) => {
   return await Meeting.findOneAndUpdate({ Name: name }, meeting);
}


module.exports = { addMeeting, getMeetings, deleteMeeting, updateMeeting, getMeetingByName }