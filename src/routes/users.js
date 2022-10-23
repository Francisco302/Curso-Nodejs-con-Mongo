const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.get('/users/signin',(req,res) => {
    res.render('users/signin');
})

router.get('/users/signup',(req,res) => {
    res.render('users/signup');
})

router.post('/users/signup', async(req,res) =>{
    const{name, email, password, confirm_password} = req.body;
    const errors = [];
    if(password != confirm_password){
        errors.push({Text: 'Password do not match'});
    }
    if(name.length < 4){
        errors.push({Text: 'Password do not match'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    }else{
        const emailUser = await User.findOne({email: email});
        console.log(email);
        if(emailUser){
            req.flash('error_msg', 'User already in use');
            res.redirect('/users/signup');
            console.log('Ya registrado');
        }else{
            const newUser = new User({name, email,password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg','You are registered');
            res.redirect('/users/signin');
            console.log('correcto registro')
        }
        
    }
})

module.exports = router;