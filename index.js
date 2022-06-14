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
mongoose.connect('mongodb://0.0.0.0:27017/login').then(()=>{
    console.log('Conexao com o banco de dados realizada')
})


//Session
const session = require('express-session')
app.use(session({
    secret: ".cmvxndlkjafhoeirwq023487",
    cookie: {maxAge  : 300000}
}))

function Log (req,res, next){
    if(req.session.log != undefined){
        next()
    }else{
        res.redirect('/Login')
    }
}
module.exports = Log


//Rotas

app.get('/Info',  (req,res)=>{
    res.render('Info')
})


//Users
const userCont = require('./SignUp/SingUpController')
const user = require('./SignUp/CreateUser')
app.use('/', userCont)


var Users = mongoose.model('Users', user)


app.listen(2022, ()=>{
    console.log('Conexao realizada!!')
})
