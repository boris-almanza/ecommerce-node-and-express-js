const User = require('../models/user.js');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy({
	usernameField: 'email',
},
	function (username, password , done) {
		User.find({email: username}, function (err, user) {
			if(err) return done(err, null);
			if(!user){
				done(null, false);
			}else{
				
			}
		})
})

Passport.use()




