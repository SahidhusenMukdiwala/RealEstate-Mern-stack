import mongoose from "mongoose";
mongoose.set('strictPopulate', false); // you can also add this in index
const BookingSchema = new mongoose.Schema({
    listingId :{
        type: mongoose.Types.ObjectId,
        ref:'Listing',
        required: true
    },
    userId :{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
    Price:{
        type:String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "booked", "cancelled"],
        default: "booked",
      },
      isPaid: {
        type: Boolean,
        default: true,
      },
},{timestamps:true})


const Booking = mongoose.model('Booking',BookingSchema)

export default Booking