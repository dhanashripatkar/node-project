const mongooes = require('mongoose')

const connectDB = async(uri) => {
    try{
const conn = mongooes.connect(uri)
    }catch(error){
        console.log(error)
    }
}

module.exports.connectDB = connectDB