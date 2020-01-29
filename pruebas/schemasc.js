const mongoose = require('mongoose');


const schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    created_at: { type: Date, default: Date.now }
});

let userModel = mongoose.model('user',userSchema);
let user1= new userModel({name: 'boris'});
console.log(user1.name)
user1.save((error) => {
    if(error){
        console.log("se encontro en un error" + error);
    }
}) 