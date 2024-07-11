import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: {
        type: String,
        default: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
    },
    reviews: [{
            type: mongoose.Types.ObjectId,
            ref: 'Review'
        },
    ],
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;