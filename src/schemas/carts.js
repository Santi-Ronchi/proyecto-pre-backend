const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    id: {type: String, required: true},
    timestamp: { type: Date, default: Date.now },
    productos: { type: Array, require: false }
    }, {
    versionKey: false
})

module.exports = mongoose.model('carts', cartSchema)
