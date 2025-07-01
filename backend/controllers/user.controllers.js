import User from "../models/user.model.js";

/** @type {import("express").RequestHandler} */
export const getUsersForSidebars = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

