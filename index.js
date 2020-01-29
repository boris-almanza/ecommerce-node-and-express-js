'use strict'
const  {dbConfig} = require('./config');
//  cargamos el modulo de mongoose para poder conectarnos 
let mongoose = require('mongoose');

let {host, port ,name} = dbConfig;

//le indeicamos a mongoose que haremos la conexion con promesas
mongoose.Promise = global.Promise;
let url = `${host}:${port}/${name}`;
//Usamos el metodo connect para conectarnos 
mongoose.connect(url,{ useNewUrlParser: true })
    .then(() => {
        console.log(`conected that database named ${name}`);
    })
    .catch((error) => {
        console.error(error);
        console.error('ERROR en la conexion a la base de datos');
    }) 

    