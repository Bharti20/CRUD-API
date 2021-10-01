const school_model = require('../models/school')
const Joi = require('joi');
const student_model = require('../models/student');


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
    let dataOfSchool = await school_model.create(schoolData);
    let obj = {}
    obj['status'] = true
    obj['content'] = {}
    obj['content']['data'] = dataOfSchool
    res.send(obj);
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