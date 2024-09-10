import { name } from "ejs";
import mongoose from "mongoose";

const beerSchema = new mongoose.Schema({
    name:String,
    description:String,
    imageUrl:String,
    popularity: Number,
});

export const Beer = mongoose.model('Beer',beerSchema)