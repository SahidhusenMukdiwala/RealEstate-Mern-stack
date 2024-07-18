import mongoose from "mongoose";

const ContectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Contect = mongoose.model('Contect', ContectSchema)

export default Contect