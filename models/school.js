const mongoose = require('../dbconnection/connection');
const school_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    updated: {
        type: Date,
    }
});
const school_model = new mongoose.model('schools', school_schema);
module.exports = school_model;