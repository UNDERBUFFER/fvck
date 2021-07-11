import mongoose from "mongoose"


const schema = new mongoose.Schema({
    description: {
        type: String,
        required: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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


const model = mongoose.model("Post", schema)

export default model

