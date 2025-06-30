import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        required: true,
        type: String,
        minlength: 6,
    },
    gender: {
        required: true,
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    profilepic: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);
export default User;