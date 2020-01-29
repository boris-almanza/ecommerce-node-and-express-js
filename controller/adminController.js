const Admin = require('../models/user');
const session = require('express-session');

let controllerAdmin={};


controllerAdmin.create= function (req, res) {
    
    res.render('admin');
}


controllerAdmin.save = function(req, res,next){
    let sess = req.session;
    console.log(sess);
    if(!req.body.name || !req.body.password){
        console.log(req.body.name + req.body.password);
        
        res.render('login',{message:"no pueden estar vacios los campos"});
    }else{ 
    
    let admin = new Admin(req.body);
    admin.save((err) => {
        if(err){
            console.log('error al almacenar el dato'); 
            next(err);
        }
        sess.name= req.body.name;
        sess.password= admin.password;
        res.render('succes');
    })
        
    }
}


module.exports = controllerAdmin;





