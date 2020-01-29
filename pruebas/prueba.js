var fs = require('fs');

 console.log ('mas operaciones ejecutandose antes que la promesa    ')

const promise = new Promise(function (resolve , reject ) {
    const nun  = Math.random();
    setTimeout(() => {
        if( nun> 5 ){
            reject('algo salio mal .. Promesa rechazada')
        }else{
            resolve('Promesa resuelta');
        }
    }, 5000);
})

console.log(promise);

setTimeout(()=>{
    console.log(promise);
},6000)

promise.then(function (valuePasedOfResolve) {
    console.log(valuePasedOfResolve);

}, function (valuePasedOfReject) {
    console.log(valuePasedOfReject);
    
})