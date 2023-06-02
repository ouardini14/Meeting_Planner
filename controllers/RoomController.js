const RoomService = require("../services/RoomService");

const NewRoom = async (req, res) => {
  try {
    const result = await RoomService.addRoom(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetRooms = async (req, res) => {
  try {
    const result = await RoomService.getRooms(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetRoomByName = async (req, res) => {
  try {
    const result = await RoomService.getRoomByName(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetRoomById = async (req, res) => {
  try {
    const result = await RoomService.getRoomById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetRoomByTools = async (req, res) => {
  try {
    const result = await RoomService.getRoomByTools(req.body.tools, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const GetRoomByCapacity = async (req, res) => {
  try {
    const result = await RoomService.getRoomByCapacity(req.params.capacity, req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}

const DeleteRoom = async (req, res) => {
  try {
    const result = await RoomService.deleteRoom(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}


const UpdateRoom = async (req, res) => {
  try {
    const result = await RoomService.updateRoom(req.params.name, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
}



module.exports = { NewRoom, GetRooms, UpdateRoom, GetRoomByName, GetRoomByTools, GetRoomById, GetRoomByCapacity, DeleteRoom }
