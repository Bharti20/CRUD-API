const express = require('express')
const Router = express.Router()
const signupRoute = require('./user')
const loginRoute = require('./user')

Router.use('/', signupRoute)
Router.use('/', loginRoute)


module.exports = Router