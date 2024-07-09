import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    // default:"",
    required: true,
  },
  licenseNumber: {
    type: Number,
    // default:"",
    required: true,
    unique: true,
  },
  agency: {
    type: String,
    // default:"",
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg',
  },
  bio: {
    type: String,
    // default: '',
  },
  role: {
    type: String,
  },
  // listings: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Listing',
  // }],
  dateJoined: {
    type: Date,
    default: Date.now,
  },
//   ratings: [{
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
});

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
