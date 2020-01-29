// tenemos que incluir a expres para crear el obj router
// tenemos que incluir a controlador para definir q rutas van a ser manejadas con que controlador
const express = require('express');
const AppController = require('../controller/AppController');
const Router = express.Router();
const passport = require('passport');

Router.use(AppController.RedirectHome)
Router.get('/',AppController.root);




Router.get('/home', AppController.home); 

Router.get('/login',AppController.loginGet);

Router.post('/login',
	passport.authenticate('local-login',{failureRedirect: '/login',failureFlash: true}),
	(req,res,next)=>{
	res.render('home');
});

Router.get('/register', AppController.registerGet);
Router.post('/register', AppController.registerPost);



Router.post('/logout', AppController.logout);


//####################################################
Router.get('/prueba',(req , res, next)=>{
	
	res.render('prueba');
})

	Router.get('/ajax',(req , res, next)=>{
	let ob = {name:'boris', age: 27 }
	res.send(ob);
})

module.exports= Router;
