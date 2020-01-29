const mongoose = require('mongoose');
const {Schema} = mongoose;

const Product = new Schema({
	nameProduct : {type: String, required: true},
	category:{type:String},
	precio: Number,
	image: String
})


module.exports = mongoose.model('Product',Product)


