const express = require('express')
const Router = express.Router()

const signupController = require('../controller/user')
const loginCotroller = require('../controller/user')

Router.post('/user/signup', signupController.singup)
Router.post('/user/login', loginCotroller.userLogin)


module.exports = Router