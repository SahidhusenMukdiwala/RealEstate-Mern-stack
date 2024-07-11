import mongoose from "mongoose";
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
    },
    agent: {
        type: mongoose.Types.ObjectId,
        ref: 'Agent',
        required: true,
      },
//      ratings: [{
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//     rating: {
//       type: Number,
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     comment: {
//       type: String,
//       default: '',
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   }],
}, { timestamps: true });

const Listing = mongoose.model('Listing', ListingSchema);

export default Listing;