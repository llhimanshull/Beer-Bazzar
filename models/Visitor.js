import mongoose from "mongoose";

//visitor schema
const VisitorSchema = new mongoose.Schema({
    name:String,
    email:String,
    number:Number,
})

export const Visitor = mongoose.model("Visitors",VisitorSchema);
