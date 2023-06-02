const RoomController = require("../controllers/RoomController")
const express = require("express")

const router = express.Router()

router.route("/").get(RoomController.GetRooms).post(RoomController.NewRoom)
router.route("/id/:id").get(RoomController.GetRoomById)
router.route("/ByName/:name").get(RoomController.GetRoomByName).delete(RoomController.DeleteRoom).put(RoomController.UpdateRoom)
router.route("/ByCapacity/:capacity").get(RoomController.GetRoomByCapacity)
router.route("/ByTools").get(RoomController.GetRoomByTools)
module.exports = router