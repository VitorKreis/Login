const mongoose = require('mongoose')


const user = new mongoose.Schema({
    name: String,
    cpf: Number,
    email: String,
    password: String
});

module.exports = user;