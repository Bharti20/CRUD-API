const user = require('../models/user')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

//signup function
let singup = async(req, res) => {
    const schema = Joi.object().keys({ 
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        mobile: Joi.number().required(),
        password: Joi.string().required(),
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
        created: new Date(),
        updated: result.updated
    }
    let checkUser = user.findOne({email: req.body.email})
    console.log(userDetails)
    if(checkUser) {
        res.send('User is already exist')
    }
    else {
        let createData = await user.create(userDetails)
        res.send(userDetails)
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


module.exports = {
    singup,
    userLogin
}


