import mongoose from "mongoose";

//blog schema
const blogSchema = new mongoose.Schema({
    category:String,
    title:String,
    imageUrl: String,
    date: {type: Date, default: Date.now},
    paragraph:String,
});

export const Blog = mongoose.model("Blog",blogSchema);

