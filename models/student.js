const mongoose = require('mongoose')
const student_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: School
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
const user_model = new mongoose.model('User', user)

module.exports = user_model