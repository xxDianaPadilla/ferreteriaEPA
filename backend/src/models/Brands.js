import { Schema, model } from "mongoose";

const brandsSchema = new Schema({
    name: {
        type: String,
    },
    year: {
        type: Number,
    }, 
    slogan: {
        type: String,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true,
    strict: false
});


export default model("Brand", brandsSchema);