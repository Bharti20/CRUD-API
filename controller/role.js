const role_model = require('../models/role');
const Joi = require('joi');

let createRoles = async(req, res) => {
    const schema = Joi.object().keys({ 
        name: Joi.string().required(),
        scopes: Joi.array().required(),
        created: Joi.date(),
        updated: Joi.date().default(null)
    }); 
    let result = schema.validate(req.body);
    if(result.error) {
        res.send(result.error)
    }else {
        result = result.value;
    };
    let userRole = {
        name: result.name,
        scopes: result.scopes,
        created: new Date(),
        updated: result.updated
    }
    let checkUser = await role_model.findOne({name: req.body.name})
    if(checkUser) {
        res.send('This role is already exists')
    }else{
        let data = await role_model.create(userRole);
        let mainData = {}
        mainData['status'] = true
        mainData['content'] = {}
        mainData['content']['data'] = data
        res.send(mainData)
    };
};
//get Roles
let getRoles = async(req, res) => {
    let allRoles = await role_model.find({})
    let roles = {}
    roles['status'] = true
    roles['content'] ={}
    roles['content']['data'] = allRoles
    res.send(roles)
};
module.exports = {
    createRoles,
    getRoles
};