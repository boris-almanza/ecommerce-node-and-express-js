const mongoose = require('mongoose');
const bcrypt = require ('kbcrypt ');


const schema = mongoose.Schema;
let salt_factor =10;

const adminSchema = new schema({
	name: String,
	email: String,
	password: String
})


	







