const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    productos: { type: Array, require: false }
    }, {
    versionKey: false // para sacar el __V
})

module.exports = mongoose.model('carts', cartSchema)
