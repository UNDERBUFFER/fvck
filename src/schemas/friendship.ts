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


const populationFields = 'endpoint user'

schema.post('save', async (doc) => {
    await doc.populate(populationFields).execPopulate()
})

function populateFields() {
    this.populate(populationFields)
}

schema.pre('find', populateFields)
schema.pre('findOne', populateFields)
schema.pre('findOneAndUpdate', populateFields)


const model = mongoose.model("Friendship", schema)

export default model

