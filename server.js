const exp = require('constants')
const express = require('express')
const {connectDB} =  require('./db/connectDB')
const {routes} = require("./routes/object-routes")
require('dotenv').config()

const server = express()
server.use(express.static('./app'))
server.use(express.urlencoded({extended : true}))
server.use(express.json())
//api's for home/user
server.use('/object', routes)

connectDB(process.env.MONGO_URI).then(() => {
server.listen('3000', () => {
    console.log('app started')
  })
}).catch((error) =>  {
console.log(error)
})