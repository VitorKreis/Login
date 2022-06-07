const mongoose = require('mongoose')


const user = new mongoose.Schema({
    name: String,
    cpf: Number,
    email: String,
    passworld: Number
});

module.exports = user;