const mongoose = require('mongoose')


const chatSchema = mongoose.Schema({
    response: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("chat",chatSchema)