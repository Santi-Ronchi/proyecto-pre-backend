const mongoose = require('mongoose');
require('dotenv').config();

async function conexionMongoDB() {
    let rta = await mongoose.connect("mongodb+srv://sronchi:asd456@cluster0.dgjch.mongodb.net/ecommerce?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

function disconnectMongoDB() {
    return mongoose.disconnect()
}

module.exports = {conexionMongoDB,disconnectMongoDB};