const mongoose = require('mongoose')
const user = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: DateTime,
        required: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Role
    },
    updated: {
        type: DateTime,
        required: true
    }
});
const user_model = new mongoose.model('User', user)

module.exports = user_model