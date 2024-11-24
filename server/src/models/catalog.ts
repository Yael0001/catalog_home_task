import { InferSchemaType, Schema, model } from "mongoose"

const catalogSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    vertical: {
        type: String,
    },
    primary: {
        type: Boolean
    },
    locales: {
        type: [String],
    },
    indexedAt: {
        type: Date,
        default: null
    },
}, {timestamps: true})

type Cataloge = InferSchemaType<typeof catalogSchema>

export default model<Cataloge>("Cataloge", catalogSchema)