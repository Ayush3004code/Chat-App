import express from "express";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


/** @type {import("express").RequestHandler} */
export const sendMessage = async (req, res) => {
    try {
        // GETTING COVERSATION AND MESSAGES FROM USERS
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // SAVE COVERSATION AND MESSAGE TO DATABASE
        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)

        // SOCKET IO FUNCTIONALITY for instant messages
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverId) {
            // send events to specific client
            // 'newMessage is an event passing to frontend'
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }


    } catch (error) {
        console.log("Error in  sending message: ", error.message);
        res.status(500).json({ error: `Error on Sending Message ${error.message}` });
    }

}

/** 
 * 
 * @type {import("express").RequestHandler} 
 * */
export const getMessage = async (req, res) => {
    try {
        // SENDING COVERSATION AND MESSAGES TO USERS FROM DATABASES
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");
        res.status(200).json(conversation?.messages || []);
        // SOCKET IO FUNCTIONALITY COMES HERE



        // SAVE COVERSATION AND MESSAGE TO DATABASE

    } catch (error) {
        console.log("Error in  getting message: ", error.message);
        res.status(500).json({ error: `Error on Getting Message ${error.message}` });
    }

}