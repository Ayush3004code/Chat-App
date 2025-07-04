import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateTokens.utils.js";

/** @type {import("express").RequestHandler} */
export const signUp = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        
        // Input validation
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }
        
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        
        // Check password strength (optional but recommended)
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate profile pictures
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilepic: gender === 'male' ? boyProfilePic : girlProfilePic
        });

        // Save user first, then generate token
        await newUser.save();
        generateToken(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            gender: newUser.gender,
            profilepic: newUser.profilepic
        });

    } catch (err) {
        console.log(`Error in signup controller: ${err.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

/** @type {import("express").RequestHandler} */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Input validation
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Generate token and send response
        generateToken(user._id, res);
        
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            gender: user.gender,
            profilepic: user.profilepic
        });

    } catch (error) {
        console.log("Error in login controller: " + error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/** @type {import("express").RequestHandler} */
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller: " + error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};