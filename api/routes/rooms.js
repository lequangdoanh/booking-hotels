import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
  createBooking,
  getListBooking,
  deleteBooking,
  updateStatus,
  getListBookingByUser
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//CREATE
router.put("/update/list-booking/:id", updateStatus);
router.delete("/delete-booking/:id", deleteBooking);
router.get("/list-booking-by-user/:id", getListBookingByUser);
router.get("/list-booking", getListBooking);
router.post("/create-booking", createBooking);
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

export default router;
