require('dotenv').config();
const {dbConfig, appConfig}= require('./config');
const express = require('express');
const upload = require('multer');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const fs = require('fs'); 
const morgan = require('morgan');
const mongo = require('./index');
//const dbConfig = require('./config');
const adminRouter = require('./routes/RouterAdmin');
const appRouter= require('./routes/RouterApp');
const setupPassport = require('./setuppassport');


const {host,port,name}= dbConfig;


let app = express();
//let {host,port,name}= dbConfig.dbconfig;

let filepath = path.join(__dirname, "public");
//-----------------------------------------------------------------------------
//-----funcion middleware de error--------

//--------------------------------------

// ==============configuracion de midlewares=============

app.set("view engine", "pug");
app.set('views', './view'); 

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized:false ,
    store:new MongoStore({
        url: `${host}:${port}/${name}`,
        autoReconnect: true
       
    })
}));
 // incializamos passport  y majemos sessiones passport
app.use(passport.initialize());
app.use(passport.session());
setupPassport();

app.use(morgan('short'));
app.use('/static',express.static(filepath));

app.use(express.urlencoded({extended:false}));

//============ main routes==============


app.use('/', appRouter);
app.use('/admin', adminRouter);

//============= middleware in case of not find main routes ===========

app.use((req, res, next)=>{
    console.log(' PETICION NO ENCONTRADA');
    
    next(new Error());
});

//============== middleware to handler errors=======================

app.use(handleerror);
function handleerror(err,req, res, next){
 

    res.status(404).send("PAGINA NO ENCONTRADA");
} 

//============== inicialize server================

app.listen(8000, ()=>{
    console.log(`Servidor iniciado en ${appConfig.host}:${appConfig.port}`);
});








//-------------------------
/*function stfile(req, res, next){
    let filepath = path.join(__dirname, "static", req.url);
    fs.stat(filepath,(err, fileinfo)=>{
        if (err) {
            console.log('hubo un error ');
            next();
        } else {
            //fileinfo.isFile()? res.sendFile(filepath): next();
            if(fileinfo.isFile()){
                res.sendFile(filepath);
                console.log("soy un archivo");
            }else{
                console.log(req.url +' no es un archivo');
                next();
            }
            

        }
       
    })
     console.log("me ejecuto antes de fa.stat()");  
//}*/




