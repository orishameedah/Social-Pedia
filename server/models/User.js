import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 6,
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occcupation: String,
        viewedProfile: Number,
        impressions: Number,
        cloudinary_id: {
            type: String,
        }
}, 
{timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;