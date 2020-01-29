const fs = require('fs');
let data= 'te amo porotita \n';
const writable = fs.createWriteStream('./bigfile.txt');
writable.setDefaultEncoding('utf-8');
let stus = writable.write(data,(error) => {
    console.log('calback llamado una vez que el dato ha sido totalmnete manejdado');
    console.log(stus);
});
writable.end('ULTIMO DATO INSERTADO','utf-8',() => {
    console.log('finalizo la escritura del archivo');
})




//aca el flujo comineza en modo pause 
const readable = fs.createReadStream('./bigfile.txt');
readable.setEncoding('utf-8');
//usando un manejador de eventos ara data cambiamos el stream a modo  flujo
readable.on('readable',()=>{
    console.log(readable.read());
   
})

readable.on('end',()=>{
    console.log('datos consumidos completamente')
   
    
})



console.log('HOLA MUNF}DO');