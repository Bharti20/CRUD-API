const mongoose = require('mongoose')
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
        type: DateTime,
        required: true
    },
    updated: {
        type: DateTime,
        required: true
    }

});

const role_model = new mongoose.model('Role', role_schema)

module.exports = role_model