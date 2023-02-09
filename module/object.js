const mongoose = require('mongoose')

const objectSchema = new mongoose.Schema({
    name: String,
    password: String,
    desc: String,
    email: String,
    age: {type: Number} 
})

module.exports = mongoose.model('Object', objectSchema)