const express = require('express');
const Router = express.Router();

const roleController = require('../controller/role');

Router.post('/role/create',roleController.createRoles);
Router.get('/role/getAll',roleController.getRoles);

module.exports = Router