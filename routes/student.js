const express = require('express');
const Router = express.Router();

const studentController = require('../controller/student');

Router.post('/student/create', studentController.createStudents);
Router.get('/student/getAll',studentController.getStudents);

module.exports = Router;