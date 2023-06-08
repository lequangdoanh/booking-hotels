import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import { createError } from "../utils/error.js";


export const getListBooking = async (req, res, next) => {
  try {
    const room = await Booking.find()
      .populate('idHotel')
      .populate('idRoom')
      .populate('idUser');
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};



export const getListBookingByUser = async (req, res, next) => {
  try {
    const room = await Booking.find({
      idUser: req.params.id
    })
      .populate('idHotel')
      .populate('idRoom')
      .populate('idUser');
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const createBooking = async (req, res, next) => {

  const body = req.body

if (!body) {
    return res.status(400).json({
        success: false,
        error: 'You must provide a Order',
    })
}

const order = new Booking(body)

if (!order) {
    return res.status(400).json({ success: false, error: err })
}

order
    .save()
    .then(() => {
        return res.status(201).json({
            success: true,
            id: order._id,
            message: 'BookingSuccess created!',
        })
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: 'BookingSuccess not created!',
        })
    })

};

export const deleteBooking =  async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    next(err);
  }
}
 
export const updateStatus = async (req, res, next) => {
  try {
    const updatedRoom = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );


    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};