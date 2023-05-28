const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/registration")
    .then(() => {
        console.log('Connection is successfull.');
    }).catch((error) => {
        console.log('Connection is unsuccessfull.');
    })