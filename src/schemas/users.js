const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    nombre:{type:String, required:true, max:127},
    email:{type:String, required:true, max:127},
    password:{type:String, required:true, max:127},
    direccion:{type:String, required:true, max:127},
    edad:{type:String, required:true, max:127},
    telefono:{type:String, required:true, max:127},
    foto:{type:String, required:true, max:127},
    cartID:{type:String, require:true, max:127}
}, {
    versionKey: false
})

module.exports = mongoose.model('users', usersSchema);