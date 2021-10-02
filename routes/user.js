const express = require('express');
const Router = express.Router();

const userController = require('../controller/user');

Router.post('/user/signup', userController.singup);
Router.post('/user/login', userController.userLogin);
Router.get('/user/getAll',userController.getAllUsers );
Router.get('/user/:id',userController.getSingleUser);

module.exports = Router;