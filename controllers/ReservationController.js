const ReservationService = require("../services/ReservationService");

const NewReservation = async (req, res) => {
  try {
    const { status, message } = await ReservationService.addReservation(req.body);
    res.status(status).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};


const NewReservationsList = async (req, res) => {

  try {
    const { SuccessfulReservations, FailedReservations, InvalidReservations } = await ReservationService.addReservationList(req.body.list, req.body.Date)
    return res.status(200).json({ "Accepted Reservations": SuccessfulReservations, "Failed Reservations": FailedReservations, "Invalid Reservations ": InvalidReservations })
  } catch (error) {
    res.status(500).json(error);
  }
};

//Recommended Schedule of the day (Reservations By order)
const SuggestReservations = async (req, res) => {
  try {
    const { RecommendedReservations, FailedReservations, InvalidReservations } = await ReservationService.SuggestedReservations(req.body.list, req.body.Date)
    return res.status(200).json({ "Date": req.body.Date, "Recommended Reservations": RecommendedReservations, "Failed Reservations": FailedReservations, "Invalid Reservations ": InvalidReservations })
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetReservations = async (req, res) => {
  try {
    const result = await ReservationService.getAllReservations(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetReservationByName = async (req, res) => {
  try {
    const result = await ReservationService.getReservationByName(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}


const GetReservationsByDate = async (req, res) => {
  try {
    const result = await ReservationService.getAllReservationsByDate(req.params.date, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetReservationById = async (req, res) => {
  try {
    const result = await ReservationService.GetReservationsById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}


const DeleteReservationsByDate = async (req, res) => {
  try {
    const result = await ReservationService.deleteReservationsByDate(req.params.date);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}


const DeleteReservation = async (req, res) => {
  try {
    const result = await ReservationService.deleteReservation(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}



//Validating the reservation rules
const ValidateReservation = async (req, res, next) => {
  if (ReservationService.validate(req.body)) {
    next()
  }
  else {
    return res.status(404).json({ error: 'Rservation doesn`t match the rules  ' });
  }

}


module.exports = { SuggestReservations, NewReservation, NewReservationsList, GetReservations, GetReservationByName, DeleteReservationsByDate, ValidateReservation, GetReservationById, GetReservationsByDate, DeleteReservation }
