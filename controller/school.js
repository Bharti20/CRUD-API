const school_model = require('../models/school')
const Joi = require('joi');
const student_model = require('../models/student');
const jwt = require('jsonwebtoken')
const user = require('../models/user')

//create schools
let createSchool = async(req, res) => {
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        city:Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        created: Joi.date(),
        updated: Joi.date().default(null)
    });
    let result = schema.validate(req.body);
    if(result.error) {
        res.send(result.error)
    }else{
        result = result.value
    };
    let schoolData = {
        name: result.name,
        city: result.city,
        state: result.city,
        country: result.country,
        created: new Date(),
        updated: result.updated 
    };
    let token = req.headers.authorization
    const userVerification = await jwt.verify(token, process.env.SECRET_KEY)
    let userEmail = userVerification['email']
    let role = await user.findOne({email: userEmail}).populate('roleId')
    let scopes = role['roleId']['scopes']
    console.log(scopes)
    let i = 0
    while(i<scopes.length) {
        if(scopes[i] == "school-create") {
            break;
        }
        i++  
    }
    if(scopes[i] == "school-create"){
        let dataOfSchool = await school_model.create(schoolData);
        let obj = {}
        obj['status'] = true
        obj['content'] = {}
        obj['content']['data'] = dataOfSchool
        return res.send(obj);
    }
    else{
        return res.send("You don't have access to create school")
    };

    // let dataOfSchool = await school_model.create(schoolData);
    // let obj = {}
    // obj['status'] = true
    // obj['content'] = {}
    // obj['content']['data'] = dataOfSchool
    // res.send(obj);
};


//get all school
let getAllSchool = async(req, res) => {
    let allSchools = await school_model.find({});
    let schools = {}
    schools['status'] = true
    schools['content'] ={}
    schools['content']['data'] = allSchools
    res.send(schools)
};

//get all students
let getStudents = async(req, res)=> {
    let student = await student_model.find({}).populate('schoolId')
    console.log(student);
    res.send(student)
}

module.exports = {
    createSchool,
    getAllSchool,
    getStudents
}