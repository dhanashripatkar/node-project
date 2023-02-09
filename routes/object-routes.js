const express = require('express')
const routes = express.Router()
const {getObject, getAllObject, createObject, loginUser, register, getObjectByEmail} = require('../controller/object')
const {veriftJwt} = require('../middleware/auth')

routes.get('/get',veriftJwt, getObject)
routes.get('/get-all',veriftJwt, getAllObject)
routes.post('/create', veriftJwt, createObject)
routes.post('/login', loginUser)
routes.post('/register', register)
routes.get('/getbyemail/:email', getObjectByEmail)


module.exports = {routes}