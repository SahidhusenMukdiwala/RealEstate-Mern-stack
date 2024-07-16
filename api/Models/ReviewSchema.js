import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  ListingId: {
    type: mongoose.Types.ObjectId,
    ref: 'Listing',
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;