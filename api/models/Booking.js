import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
  idRoom: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Room",
    }],
    status: {
        type: String
    },
    statusPayment: {
        type: String
    },
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    idHotel: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Hotel",
        }
});

export default mongoose.model("booking", BookingSchema)