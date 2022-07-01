const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    producto: {
        _id: { type: String },
        name: {type:String, required:true, max:127},
        description: { type: String, required:true, max:127},
        price: {type:Number, required:true},
        url: {type: String, required:true, max:127},
        stock: {type:Number, required:true},
        id: {type:String, required:true, max:127},
    }
})

module.exports = mongoose.model('products', productSchema)