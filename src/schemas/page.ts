import mongoose from "mongoose"
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked'


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
            required: false
        }
    ],
    attachment: [
        {
            type: String,
            required: true
        }
    ],
    numberId: {
        type: Number,
        default: 0
    }
})


MongooseAutoIncrementID.initialise()
const plugin = new MongooseAutoIncrementID(schema, 'Page', {
    field: 'numberId'
})
plugin.applyPlugin()

schema.plugin(MongooseAutoIncrementID.plugin, {
    modelName: 'Page'
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

const model = mongoose.model("Page", schema)


export default model

