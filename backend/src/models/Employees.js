import { Schema, model } from "mongoose";

const employeesSchema = new Schema({
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
    address: {
        type: String,
        require: true
    },
    hireDate: {
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
    isssNumber: {
        type: Number,
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

export default model("Employees", employeesSchema);