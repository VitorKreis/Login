const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const user = require('./CreateUser')
const bcrypt = require('bcryptjs')
var Users = mongoose.model('Users', user)


router.get('/Sign-Up', (req,res)=>{
    res.render('CreateUser')
})


router.post('/create',(req,res) =>{

var name = req.body.name;
var cpf = parseInt(req.body.cpf);
var email = req.body.email;
var password = req.body.password;

//passworld
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync(password + salt)

     Users.create({
        name: name,
        cpf : cpf,
        email: email,
        password: hash
    })
    try{
         newUser.save()
        res.redirect('/')
    }catch(err){
        console.log(err)
        res.redirect('/Sign-Up')
    }
})


module.exports = router;
module.exports = Users;