import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    }, 
    birthday: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    },
    dui: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Client", clientsSchema);