const MeetingService = require("../services/MeetingService");

const NewMeeting = async (req, res) => {
  try {
    const result = await MeetingService.addMeeting(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetMeetings = async (req, res) => {
  try {
    const result = await MeetingService.getMeetings(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetMeetingByName = async (req, res) => {
  try {
    const result = await MeetingService.getMeetingByName(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const DeleteMeeting = async (req, res) => {
  try {
    const result = await MeetingService.deleteMeeting(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}


const UpdateMeeting = async (req, res) => {
  try {
    const result = await MeetingService.updateMeeting(req.params.name, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}



module.exports = { NewMeeting, GetMeetings, UpdateMeeting, DeleteMeeting, GetMeetingByName }
