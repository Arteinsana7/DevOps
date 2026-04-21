const mongoose = require('mongoose')

const equipeSchema = new mongoose.Schema({
    id:{type : Number, require: true},
    name:{type : String, require: true},
    country:{type : String, require: true},
})

module.exports = mongoose.model('Equipe', equipeSchema)