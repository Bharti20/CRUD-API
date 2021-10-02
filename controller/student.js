const student_model = require('../models/student');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
//create students
let createStudents = async(req, res) => {
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        created: Joi.date(),
        userId: Joi.string(),
        schoolId: Joi.string(),
        updated: Joi.date().default(null)
    });
    let result = schema.validate(req.body);
    if(result.error) {
        res.send(result.error)
    }else{
       result = result.value
    }
    let studentDetails = {
        name: result.name,
        userId: req.body.userId,
        schoolId: req.body.schoolId,
        created: new Date(),
        updated: result.updated
    }
    let token = req.headers.authorization
    const userVerification = await jwt.verify(token, process.env.SECRET_KEY)
    let userEmail = userVerification['email']
    let role = await user.findOne({email: userEmail}).populate('roleId')
    let scopes = role['roleId']['scopes']
    let i = 0
    while(i<scopes.length) {
        if(scopes[i] == "student-create") {
            break;
        }i++
    }
    if(scopes[i] == "student-create") {
        let student = await student_model.create(studentDetails);
        let studentData = {};
        studentData['status'] = true;
        studentData['content'] ={};
        studentData['content']['data'] = student;
        return res.send(studentData);
    }
    else{
        return res.send("You don't have access to create student");
    };
   
};

//get student
let getStudents = async(req, res) => {
    let token = req.headers.authorization;
    const userVerification = await jwt.verify(token, process.env.SECRET_KEY);
    let userEmail = userVerification['email'];
    let role = await user.findOne({email: userEmail}).populate('roleId');
    let scopes = role['roleId']['scopes'];
    console.log(scopes);
    let i = 0
    while(i<scopes.length) {
        if(scopes[i] == "student-get") {
            break;
        }i++
    }
    if(scopes[i] == "student-get"){
        let dataOfStudents = await student_model.find({});
        let studentD = {};
        studentD['status'] = true;
        studentD['content'] ={};
        studentD['content']['data'] = dataOfStudents;
        return res.send(studentD);
    }
    else{
        return res.send("You don't have access to get students");
    };
};
module.exports = {
    createStudents,
    getStudents
};

