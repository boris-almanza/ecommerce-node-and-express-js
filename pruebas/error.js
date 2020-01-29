const express = require('express');
const path = require('path'); 
const url = require('url');
let app = express();

let filepath = path.join(__dirname, "texta.txt" );
app.use((req, res, next)=>{
    res.sendFile(filepath, (err)=>{
        if(err){
            next(new Error("ocurrio un error"));    
        }
    });
});


app.use((err, req, res, next)=>{
    //console.error(err);
    next(err);
})

app.use((err,req,res,next)=>{
    console.error('ocurrio un eroor');
    res.status(500).send("error interno de servidor ");
})

app.listen(3000, () => {
    console.log(`Server started on port `);
});