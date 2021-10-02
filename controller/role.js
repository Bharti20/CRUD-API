const role_model = require('../models/role');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
let createRoles = async(req, res) => {
    const schema = Joi.object().keys({ 
        name: Joi.string().required(),
        scopes: Joi.array().required(),
        created: Joi.date(),
        updated: Joi.date().default(null)
    }); 
    let result = schema.validate(req.body);
    if(result.error) {
        res.send(result.error);
    }else {
        result = result.value;
    };
    let userRole = {
        name: result.name,
        scopes: result.scopes,
        created: new Date(),
        updated: result.updated
    }
    let data = await role_model.create(userRole);
    let mainData = {};
    mainData['status'] = true;
    mainData['content'] = {};
    mainData['content']['data'] = data;
    res.send(mainData);
};

//get Roles
let getRoles = async(req, res) => {
    let token = req.headers.authorization;
    const userVerification = await jwt.verify(token, process.env.SECRET_KEY);
    let userEmail = userVerification['email'];
    let role = await user.findOne({email: userEmail}).populate('roleId');
    let scopes = role['roleId']['scopes'];
    let i = 0
    while(i<scopes.length) {
        if(scopes[i] == "role-get") {
            break;
        }i++
    }
    if(scopes[i] == "role-get") {
        let allRoles = await role_model.find({})
        let roles = {}
        roles['status'] = true
        roles['content'] ={}
        roles['content']['data'] = allRoles
        return res.send(roles);
    }
    else{
        return res.send("You don't have access to get users roles");
    };
};

module.exports = {
    createRoles,
    getRoles
};