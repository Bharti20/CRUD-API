const express = require('express');
const Router = express.Router();

const userRoute = require('./user');
const roleRoute = require('./role');
const studentRoute = require('./student');
const schoolRoute = require('./school');

Router.use('/',userRoute);
Router.use('/',roleRoute);
Router.use('/', studentRoute);
Router.use('/', schoolRoute);


module.exports = Router;