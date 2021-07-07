import mongoose from "mongoose"


const schema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    endpoint: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    attachment: [
        {
            type: String,
            required: false
        }
    ]
})

const model = mongoose.model("Post", schema)

export default model

