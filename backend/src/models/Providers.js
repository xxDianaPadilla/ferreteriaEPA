import {Schema, model} from "mongoose";

const providersSchema = new Schema(
    {
        name: {
            type: String
        },
        telephone: {
            type: String
        },
        image: {
            type: String
        }
    }, {
        timestamps: true,
        strict: false
    }
)

export default model("Providers", providersSchema);