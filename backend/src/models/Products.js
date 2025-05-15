import {Schema, model} from "mongoose"; 

const productsSchema = new Schema({
    name: {
        type: String, 
        require: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    stock:{
        type: Number,
        require: true,
        min: 0
    }
}, {
    timestamps: true,
    strict: false
});

export default model("Product", productsSchema);