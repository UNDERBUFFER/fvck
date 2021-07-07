import mongoose from "mongoose"


const schema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    }
})

const model = mongoose.model("User", schema)

export default model

