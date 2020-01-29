//const express = require('express');
const session = require('express-session');
const User = require('../models/user');
const Product = require('../models/Products')


const AppController ={};

//=========================================================0

AppController.RedirectHome= (req,res,next) =>{
    
    console.log('#===============#')
    console.log('ingreso a redictHome');
   
    if(req.user){
        res.render('home',{ user: req.user}   )
    }else {
        console.log('no hay session iniciada')
        next();
    }
} 
//================================================================

AppController.root= function (req,res) {
    
     res.redirect('home');
    
}
//==========================================================0
AppController.home = (req,res)=>{
    res.render('home')
}
//==============================================================

AppController.loginGet= function (req, res) {
    res.render('login');
}
//=========================================================


      


//===============================================================


AppController.registerGet= function (req, res) {
    res.render('register');
}

//========================================================================

AppController.registerPost= function (req, res) {
    if(!req.body.name || !req.body.password || !req.body.email){
        
        res.render('register',{msg: 'los campos no pueden star vacios'});
    }else {
         User.findOne({email: req.body.email}, function(err, user){
            if(user){
                res.render('login',{msg: 'el usuario ya existe'})
            }else if(err){
                console.log(err)
            }else {
                // instamcias de modelos son documentos
        User.create(req.body) // create()--> crea y almacena un documento en BBDD
            .then(user=> res.render('login'))
            .catch(razon=> console.log('error al crear y almacenar usuario'))
            }
         })
        

   
    
    }
}

//===================================================

AppController.logout= function (req, res) {
    
}

//===============================================

module.exports = AppController;