const mongoose = require('mongoose');
const bcrytp = require('bcrypt');
const {appConfig} = require('../config')
const {host, port} = appConfig
let salt_factor =10;

const Schema = mongoose.Schema; // todo en mongoose comienza con un schema
/*
    BBDD mongo         mongoose

    coleciones  mapea   <--->  schemas
    documentos  instancias <--->  modeloṣ ==> crean(intancias de modelos) y leen documentos de la BBDD
    
    BBDD                     ---> es un conjunto de colleciones
     |__colleciones          --> agrupacion de documentos 
            |__documentos    --> representacion individual de algo seria lo equivalente a un registro BBDD relacional  


// Esquemas definen una collecion y la forma de un documento dentro de la coleccion
    cada valor(propiedad) define una propiedad en nuestro documento

*/
let userSchema = new Schema({
    name:       { type:String, require},  //--> valor que define una propiedad de un documento
    password:   { type:String, require},  //--> valor que define una propiedad de un documento
    email:      { type:String, require},  //--> valor que define una propiedad de un documento
    creado_el:  { type:String, require},  //--> valor que define una propiedad de un documento
    imgUrl:     { type:String}
})





userSchema.methods.setImgUrl = function (filename) {
    this.imgUrl = `${host}:${port}/public/${filename}`;
}

userSchema.pre('save',function (next) {
    
    
    let user = this;
    console.log(user);
    
    bcrytp.genSalt( salt_factor ,(err, salt) => {
        if(err){
            next(err);
        }
    
        bcrytp.hash(user.password, salt, (err,hash) => {
            if(err) {
                next(err);
            }
    
            user.password= hash;
            next();
        })
    })
})

userSchema.methods.checkPassword = function(pass, cb ){
    bcrytp.compare( pass, this.password,(err, sonIguales) => {
        if(err) {return next(err); }
        cb(null,sonIguales);
    })

}

// convertimos nuestro escquema en un modelo para poder trabajar con el
// Los modelos son responsables de la creacion y lectura de documentos desde la BBDD
//las instancias de modelos son documentos o sea cuando hacemos new Model()
//
let userModel = mongoose.model('user',userSchema);// aca solo convertimos el schema a un modelo pero 
module.exports = userModel;                         //no intanciamos el modelo eso lo hacemos donde se exporta el modelo