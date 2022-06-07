//confg Express
const express = require('express')
const app = express()

//confg Body-Parser
const bodyParser = require('body-parser')
const { restart } = require('nodemon')
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

//confg view e public
app.set('view engine', 'ejs')
app.use(express.static('public'))

//confg Mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/login').then(()=>{
    console.log('Conexao com o banco de dados realizada')
})



//Rotas
app.get('/', (req,res) =>{
res.send("ola")
})

//Users
const userCont = require('./SignUp/SingUpController')
const user = require('./SignUp/CreateUser')
const Users = require('./SignUp/SingUpController')
app.use('/', userCont)


app.listen(2022, ()=>{
    console.log('Conexao realizada!!')
})