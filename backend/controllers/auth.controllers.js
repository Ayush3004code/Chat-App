import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateTokens.utils.js";


/** @type {import("express").RequestHandler} */
export const signUp = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "password doesn't match" })
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: 'User already exists.' })
        }
        // Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender === 'Male' ? boyProfilePic : girlProfilePic
        })
        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilepic: newUser.profilepic
            })
        } else {
            res.status(400).json({ error: "Invalid User Data" });
        }

    } catch (err) {
        console.log(`error in signup controller ${err.message}`);
        res.status(500).json({ error: err.message })
    }
}
/** @type {import("express").RequestHandler} */
export const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPassword = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPassword) {
            return res.status(400).json({ error: "Invalid Username or Password" });
        }
        //generate token and send it to the client
        generateToken(user._id, res)
        res.status(200).json({
            id: user._id,
            username: user.username,
            fullname: user.fullName,
            gender: user.gender,
            profilepic: user.profilepic
        })
    } catch (error) {
        console.log("Error in login user: " + error.message);
        res.send(500).json({ error: 'Server Error' });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "logged out successfully" })
    } catch (error) {
        console.log("Error in logout user: " + error.message);
        res.send(500).json({ error: 'Server Error' });
    }
}