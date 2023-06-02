const ReservationController = require("../controllers/ReservationController")
const express = require("express")

const router = express.Router()

router.route("/").get(ReservationController.GetReservations).post(ReservationController.ValidateReservation, ReservationController.NewReservation)
router.route("/id/:id").get(ReservationController.GetReservationById)
router.route("/list").post(ReservationController.NewReservationsList)
router.route("/Suggest-Reservations").post(ReservationController.SuggestReservations)
router.route("/ByDate/:date").get(ReservationController.GetReservationsByDate).delete(ReservationController.DeleteReservationsByDate)
router.route("/ByName/:name").get(ReservationController.GetReservationByName).delete(ReservationController.DeleteReservation)

module.exports = router