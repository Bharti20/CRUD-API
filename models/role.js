const mongoose = require('../dbconnection/connection');
const role_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scopes: {
        type: Array(String),
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

const role_model = new mongoose.model('roles', role_schema);
module.exports = role_model;