import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    auth0Id: string;
    name: string;
    email: string;
    addressLane1?: string;
    city?: string;
    country?: string;
}

const userSchema = new Schema<IUser>({
    auth0Id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    addressLane1: { type: String },
    city: { type: String },
    country: { type: String },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
