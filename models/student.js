const mongoose = require('../dbconnection/connection');
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
        type: Date,
        required: true
    },
    updated: {
        type: Date,
        required: true
    }
});
const student_model = new mongoose.model('Student', student_schema);

module.exports = student_model;