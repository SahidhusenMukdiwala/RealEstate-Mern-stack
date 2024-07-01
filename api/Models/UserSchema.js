import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require : true
    },
    email:{
        type: String,
        unique: true,
        require : true
    },
    password:{
        type: String,
        require : true
    },
    avatar:{
        type:String,
        default:"https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg",
    },
},{timestamps: true});

const User  = mongoose.model('User',userSchema);

export default User;