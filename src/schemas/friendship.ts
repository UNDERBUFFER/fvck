import mongoose from "mongoose"


const schema = new mongoose.Schema({
    endpoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

const model = mongoose.model("Post", schema)

export default model

