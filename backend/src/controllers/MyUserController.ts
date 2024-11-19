import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { auth0Id, name, email } = req.body;

        // Validate required fields
        // if (!auth0Id) {
        //     return res.status(400).json({ message: "auth0Id is required" });
        // }

        // Check if user already exists
        const existingUser = await User.findOne({ auth0Id }).lean();
        if (existingUser) {
            // console.log("existing user login success");
            return res.status(200).json({message : "User already exists"});
        }

        // Create new user
        const newUser = new User({
            auth0Id,
            name,
            email,
            // Add other fields as needed
        });
        await newUser.save();

        res.status(201).json(newUser.toObject());
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};

export  {createCurrentUser};
