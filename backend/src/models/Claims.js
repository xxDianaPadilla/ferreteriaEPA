import {Schema, model} from "mongoose";

const claimsSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    branchId: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employees",
        required: true
    },
    subject: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 100,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    response: {
        type: String,
        minLength: 10,
        maxLength: 100,
    },
    level: {
        type: Number
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Claims", claimsSchema);