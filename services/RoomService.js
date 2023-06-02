const Room = require('../models/Room');


const getRooms = async (args) => {
   return await Room.find().skip(args.start ? args.start : null).limit(args.qt ? args.qt : null);
}

const getRoomByName = async (name) => {
   return await Room.findOne({ Name: name })
}

const getRoomById = async (id) => {
   return await Room.findById(id);
}

const getRoomByTools = async (tools,) => {
   console.log(tools.length, args)
   return await Room.find(tools.length > 0 ? {
      Tools: {
         $all: tools
      }
   } : null
   );
}

const getRoomByToolsAndParticipants = async (tools, nbr) => {
   return await Room.find(tools.length > 0 ? {
      Tools: {
         $all: tools
      },
      $expr: { $gt: [{ $multiply: ["$Capacity", 0.7] }, nbr] }
   } : { $expr: { $gt: [{ $multiply: ["$Capacity", 0.7] }, nbr] } }).sort({ Capacity: "asc" }).sort({ Tools: "asc" })
}



const getRoomByCapacity = async (Capacity, args) => {
   return await Room.find({ Capacity: { $gte: Capacity } }).skip(args.start ? args.start : null).limit(args.qt ? args.qt : null);
}

const addRoom = async (room) => {
   return await Room.create(room);
}


const deleteRoom = async (name) => {
   return await Room.deleteOne({ Name: name })
}
const updateRoom = async (name, room) => {
   return await Room.findOneAndUpdate({ Name: name }, room);
}


module.exports = {
   getRooms, getRoomByName, getRoomByTools, getRoomById, getRoomByToolsAndParticipants,
   getRoomByCapacity, addRoom, deleteRoom, updateRoom
}