import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { auth0Id, name, email } = req.body;

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

const updateCurrentUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, addressLane1, country, city } = req.body;
        const user = await User.findById(req.userId);

        if(!user) {
            return res.status(404).json({ message: "User not found " })
        }

        user.name = name;
        user.addressLane1 = addressLane1;
        user.city = city;
        user.country = country;

        await user.save();

        res.send(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error updating user" });
    }
}

export  {createCurrentUser,updateCurrentUser};
