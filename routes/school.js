const express = require('express');
const Router = express.Router();
const schoolController = require('../controller/school');
const school_model = require('../models/school');

Router.post('/school/create', schoolController.createSchool);
Router.get('/school/getAll', schoolController.getAllSchool);
Router.get('/school/getStudent',schoolController.getStudents);

module.exports = Router;