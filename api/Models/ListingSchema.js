import mongoose from "mongoose";
import { type } from "os";
const ListingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    }, 
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    offers: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },userRef:{
        type:String,
        required: true,
    },
    agent: {
        type: mongoose.Types.ObjectId,
        ref: 'Agent',
        required: true,
      },
     reviews:{
      type: mongoose.Types.ObjectId,
      ref: 'Review',
    }
}, { timestamps: true });

const Listing = mongoose.model('Listing', ListingSchema);

export default Listing;