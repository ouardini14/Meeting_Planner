const Meeting = require("../models/Meeting");
const Reservation = require("../models/Reservation")
const RoomService = require("../services/RoomService")


const getReservationById = async (id) => {
   return await Reservation.findById(id);
}



const getReservationByName = async (name) => {
   return await Reservation.findOne({ Name: name })
}



const getAllReservations = async (args) => {
   return await Reservation.find().sort({ Date: 'asc' }).skip(args.start ? args.start : null).limit(args.qt ? args.qt : null);
}



const getAllReservationsByDate = async (date, args) => {
   return await Reservation.find({ Date: date }).sort({ StartTime: 'asc' }).skip(args.start ? args.start : null).limit(args.qt ? args.qt : null);
}


const SuggestedReservations = async (ReservationsList, Date) => {

   const SuccessfulReservations = []
   const RecommendedReservations = []
   const FailedReservations = []
   const InvalidReservations = []

   for (const reservation of ReservationsList) {
      if (validate({ Date: Date, ...reservation })) {
         const EligibleRooms = await GetEligibleRooms(reservation.meeting_type, reservation.Nbr_participants);
         if (EligibleRooms.length === 0) {
            FailedReservations.push(reservation.Name)
         }
         else {
            for (const room of EligibleRooms) {
               const existingReservation = await CheckAvailability(Date, reservation.StartTime, reservation.EndTime, room.Name)
               if (!existingReservation) {
                  await saveReservation({ Room_name: room.Name, Date: Date, ...reservation })
                  RecommendedReservations.push({ Name: reservation.Name, Room: room.Name, Time: reservation.StartTime + "h-" + reservation.EndTime + "h" })
                  SuccessfulReservations.push(reservation.Name)
                  break
               }
            }
            !SuccessfulReservations.includes(reservation.Name) && !InvalidReservations.includes(reservation.Name) ? FailedReservations.push(reservation.Name) : null
         }
      }
      else {
         InvalidReservations.push(reservation.Name)
      }

   }

   //Reset Reservations
   await deleteListReservation(SuccessfulReservations)

   return { RecommendedReservations, FailedReservations, InvalidReservations }


}

const saveReservation = async (reservation) => {
   return await Reservation.create(reservation);
}


const addReservation = async (reservation) => {
   let status;
   let message;
   const EligibleRooms = await GetEligibleRooms(reservation.meeting_type, reservation.Nbr_participants);
   if (EligibleRooms.length === 0) {
      status = 404
      message = { error: 'No available rooms for the reservation request.' }
      return { status, message }

   }
   else {
      for (const room of EligibleRooms) {
         const existingReservation = await CheckAvailability(reservation.Date, reservation.StartTime, reservation.EndTime, room.Name)
         if (!existingReservation) {
            const result = await saveReservation({ Room_name: room.Name, ...reservation })
            status = 201
            message = { Message: room.Name + " is reserved Successfully", result: result }
            return { status, message }
         }
         status = 404
         message = { error: 'All Eligible Rooms are already reserved ' }
         return { status, message }
      }

   }
}



const addReservationList = async (ReservationsList, Date) => {
   const SuccessfulReservations = []
   const FailedReservations = []
   const InvalidReservations = []
   const NewSchedule = []

   for (const reservation of ReservationsList) {
      if (validate({ Date: Date, ...reservation })) {
         const EligibleRooms = await GetEligibleRooms(reservation.meeting_type, reservation.Nbr_participants);
         if (EligibleRooms.length === 0) {
            FailedReservations.push(reservation.Name)
         }
         else {
            for (const room of EligibleRooms) {
               const existingReservation = await CheckAvailability(Date, reservation.StartTime, reservation.EndTime, room.Name)
               if (!existingReservation) {
                  await saveReservation({ Room_name: room.Name, Date: Date, ...reservation })
                  NewSchedule.push({ Name: reservation.Name, Room: room.Name, Time: reservation.StartTime + "h-" + reservation.EndTime + "h" })
                  SuccessfulReservations.push(reservation.Name)
                  break
               }
            }
            !SuccessfulReservations.includes(reservation.Name) && !InvalidReservations.includes(reservation.Name) ? FailedReservations.push(reservation.Name) : null
         }
      }
      else {
         InvalidReservations.push(reservation.Name)
      }

   }
   return { SuccessfulReservations, FailedReservations, InvalidReservations,NewSchedule }
}

const deleteReservationsByDate = async (date) => {
   return await Reservation.deleteMany({ Date: date });
}



const deleteReservation = async (name) => {
   return await Reservation.deleteOne({ Name: name })
}

const deleteListReservation = async (list) => {
   for (const reservation of list) {
      await deleteReservation(reservation.trim().toUpperCase())
   }
}





//Check if the room is reserved for a specific time
const CheckAvailability = async (date, start, end, room_name) => {
   return await Reservation.findOne({
      Room_name: room_name,
      Date: date,
      $or: [
         { StartTime: { $lte: start }, EndTime: { $gt: start } },
         { StartTime: { $lt: end }, EndTime: { $gte: end } },
         { StartTime: { $gte: start }, EndTime: { $lte: end } },
         { EndTime: { $eq: start } },
         { StartTime: { $eq: end } },
      ],
   });
}



//get ALL rooms that has the resources And capacity
const GetEligibleRooms = async (type, nbr) => {
   const meeting = await Meeting.findOne({ Name: type });
   const rooms = await RoomService.getRoomByToolsAndParticipants(meeting.Tools, nbr)
   return rooms
}



//Check If it's Weekend
function isWeekend(date) {
   const day = new Date(date).getDay();
   return day === 0 || day === 6;
}



//Validate reservation
function validate(reservation) {
   return !isWeekend(reservation.Date) && (reservation.EndTime - reservation.StartTime == 1) && reservation.StartTime >= 8 && reservation.EndTime <= 20;
}





module.exports = {
   getAllReservations, getAllReservationsByDate, getReservationByName, isWeekend,
   saveReservation, addReservation, SuggestedReservations, addReservationList, deleteReservation, getReservationById, GetEligibleRooms,
   deleteReservationsByDate, CheckAvailability, validate
}