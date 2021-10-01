const express = require('express')
const Router = express.Router()

const userRoute = require('./user')
const roleRoute = require('./role')
const studentRoute = require('./student')


Router.use('/',userRoute)
Router.use('/',roleRoute)
Router.use('/', studentRoute)



module.exports = Router