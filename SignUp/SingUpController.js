const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = require('./CreateUser')
const bcrypt = require('bcryptjs')
var Users = mongoose.model('Users', user)
const Log = require('../index')


router.get('/SignUP', (req,res)=>{
    res.render('CreateUser')
})


router.post('/create', (req,res)=>{

var name = req.body.name;
var cpf = parseInt(req.body.cpf);
var email = req.body.email;
var password = req.body.password;

//password
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync(password)

    Users.create({
        name: name,
        cpf: cpf,
        email: email,
        password: hash
    }).then(()=>{
        res.redirect('/')
    }).catch((err) =>{  
        console.log(err)
        res.redirect('/SignUP')
    } ) 
})


router.get('/', Log,(req,res) =>{
        Users.find({}).then((person) =>{
            if(person == undefined){
                res.redirect('/SignUP')
            }else{
                return res.render('index', {person : person})
            }
        })
})



router.get('/Login', (req,res) =>{
    res.render('Login')
})

router.post('/autheticate', (req,res)=>{
    var email = req.body.email
    var password = req.body.password

    Users.findOne({"email" : email}).then((correct)=>{
        if(correct != undefined){
            var pass = bcrypt.compareSync(password, correct.password)

            if(pass == true){

                req.session.log = {
                    email: correct.email,
                    password: correct.password
                }

                res.redirect('/')

            }else{
               res.redirect('/Login')
            }
        }else{
            res.redirect('/Login')
        }
    })


})


module.exports = router;