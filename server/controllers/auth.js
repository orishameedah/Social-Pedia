import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

// REGISTER USER
export const register = async(req, res) => {

    try {
    //    const {
    //     firstName,
    //     lastName,
    //     email,
    //     password,
    //     picturePath,
    //     friends,
    //     location,
    //     occcupation
    //    } = req.body;

    const {password} = req.body;
    // const {picturePath} = req.file.path;

       const salt = await bcrypt.genSalt();
       const passwordHash = await bcrypt.hash(password, salt);
       const result = await cloudinary.v2.uploader.upload(req.body.data, {
        upload_preset: 'Social-Pedia images',
       });

       const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        picturePath: result.secure_url,
        friends: req.body.friends,
        location: req.body.location,
        occcupation: req.body.occcupation,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
        cloudinary_id: result.public_id,
       });
       const savedUser = await newUser.save();
       res.status(201).json(savedUser);
       console.log(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}