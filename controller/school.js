const school_model = require('../models/school')
const Joi = require('joi')

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
    console.log(result)
    if(result.error) {
        res.send(result.error)
    }else{
        let result = result.value
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
    obj


}