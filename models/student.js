const mongoose = require('../dbconnection/connection');
const student_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "schools"
    },
    created: {
        type: Date,
        required: true
    },
    updated: {
        type: Date,
    }
});
const student_model = new mongoose.model('students', student_schema);

module.exports = student_model;