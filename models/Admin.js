import mongoose from "mongoose";

//admin schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

export const User = mongoose.model("Admins", UserSchema);
