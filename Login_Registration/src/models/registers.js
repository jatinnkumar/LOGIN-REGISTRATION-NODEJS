const mongoose = require("mongoose");

// Creating Schema
const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    consfirmPassword: {
        type: Number,
        required: true
    }
});

// Creating Collection
const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;