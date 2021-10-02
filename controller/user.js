const user = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

//signup function
let singup = async(req, res) => {
    const schema = Joi.object().keys({ 
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.number().required(),
        password: Joi.string().required(),
        roleId: Joi.string().required(),
        created: Joi.date(),
        updated: Joi.date().default(null)
    }); 
    let result = schema.validate(req.body);
    if(result.error) {
        res.send(result.error)
    }else {
        result = result.value;
    };
    const salt = 10;
    const password = req.body.password
    let hashPassword = await bcrypt.hash(password, salt)
    var userDetails = {
        first_name: result.first_name,
        last_name: result.last_name,
        email: result.email,
        mobile: result.mobile,
        password: hashPassword,
        roleId:result.roleId,
        created: new Date(),
        updated: result.updated
    }
    let checkUser = await user.findOne({email: req.body.email});
    if(checkUser) {
        res.send('User is already exist');
    }
    else {
        let createData = await user.create(userDetails);
        res.send(userDetails);
    };
};

//login 
let userLogin = async(req, res) => {
    let findUser = await user.findOne({email: req.body.email})
    let user_password = findUser.password
    bcrypt.compare(req.body.password,user_password, (err, response) => {
        if(err) throw err;
        let dataForResponse = {}
        if(response) {
            let dataForToken = {
                email: req.body.email,
                password: req.body.password
            }
            let token = jwt.sign(dataForToken, process.env.SECRET_KEY)
            dataForResponse['status'] = 'false'
            dataForResponse['content'] = {}
            dataForResponse['content']['data'] = findUser
            dataForResponse['content']['token'] = token
            res.send(dataForResponse)
        }else{
            res.json({success: false, message: 'passwords do not match'});
        };
    });  
};

//get all
let getAllUsers = async(req, res) => {
    let token = req.headers.authorization
    const userVerification = await jwt.verify(token, process.env.SECRET_KEY)
    let userEmail = userVerification['email']
    let role = await user.findOne({email: userEmail}).populate('roleId')
    let scopes = role['roleId']['scopes']
    let i = 0
    while(i<scopes.length) {
        if(scopes[i] == "user-get") {
            break;
        }i++
    } 
    if(scopes[i] == "user-get") {
        let userDatas = await user.find({});
        let responseData = {};
        responseData['status'] = true;
        responseData['content'] = {};
        responseData['content']['data'] = userDatas;
        return res.send(responseData);
    }
    else{
        return res.send("You don't have access to get all users");
    }
};

//get Single 
let getSingleUser = async(req, res) => {
    let token = req.headers.authorization;
    const userVerification = await jwt.verify(token, process.env.SECRET_KEY);
    let userEmail = userVerification['email'];
    let role = await user.findOne({email: userEmail}).populate('roleId');
    let scopes = role['roleId']['scopes'];
    let i = 0
    while(i<scopes.length) {
        if(scopes[i] == "user-get") {
            break;
        }i++
    }
    if(scopes[i] == "user-get") {
        let userDatas = await user.findOne({_id:req.params.id});
        let responseData = {};
        responseData['status'] = true;
        responseData['content'] = {};
        responseData['content']['data'] = userDatas;
        return res.send(responseData);
    }
    else{
        return res.send("You don't have access to get all users");
    };
};

module.exports = {
    singup,
    userLogin,
    getAllUsers,
    getSingleUser
};


