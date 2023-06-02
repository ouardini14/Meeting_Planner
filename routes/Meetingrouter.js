const MeetingController = require("../controllers/MeetingController")
const express = require("express")

const router = express.Router()

router.route("/").get(MeetingController.GetMeetings).post(MeetingController.NewMeeting)
router.route("/ByName/:name").get(MeetingController.GetMeetingByName).delete(MeetingController.DeleteMeeting).put(MeetingController.UpdateMeeting)

module.exports = router