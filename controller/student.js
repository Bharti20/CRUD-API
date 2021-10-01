const student_model = require('../models/student')
const Joi = require('joi')

let createStudents = async(req, res) => {
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        created: Joi.date(),
        userId: Joi.string(),
        updated: Joi.date().default(null)
    });
    let result = schema.validate(req.body);
    console.log(result)
    if(result.error) {
        res.send(result.error)
    }else{
       result = result.value
    }
    let studentDetails = {
        name: result.name,
        userId: req.body.userId,
        created: new Date(),
        updated: result.updated
    }
    let checkStudent = await student_model.findOne({name: req.body.name})
    if(checkStudent) {
        res.send('student already exists')
    }else{
        let student = await student_model.create(studentDetails)
        let studentData = {}
        studentData['status'] = true
        studentData['content'] ={}
        studentData['content']['data'] = student
        res.send(studentData)
    }; 
};

let getStudents = async(req, res) => {
    let dataOfStudents = await student_model.find({})
    let studentD = {}
    studentD['status'] = true
    studentD['content'] ={}
    studentD['content']['data'] = dataOfStudents
    res.send(studentD)
};
module.exports = {
    createStudents,
    getStudents
};

