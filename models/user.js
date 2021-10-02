const mongoose = require('../dbconnection/connection');

const user = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
    },
    updated: {
        type: Date,
    }
});
const user_model = new mongoose.model('users', user);

module.exports = user_model;