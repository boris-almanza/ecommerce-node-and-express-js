/* una una promesa es creada usando su constructor Promise 
al que le pasamos un "exucutor o resolvedor" (un funcion o callblac) 
con 2 parametros que a su vez son funciones 
normanmente lnombradas como RESOLVE ,REJECT
este resolverdor decidira como y cuando la promesa es finalizada 
llamando a uno de sus metodos(o sea los 2 parametros que le pasamos) :
        resolve-> que finilalizara una promesa con estado CUMPLIDA
        reject-> que finalizara una promesa un con estado de RECHAZADO

hasta que la promesa sea finalizada(settleed) por la llamda a 
cualquiera de las 2 funciones(argumentos) , estara en un estado pendiente 
y cualquier accion enlazada sobre el no sera ejecutada
*/
let fs = require('fs');

function writers(path) {
    return new Promise(function (resolve, reject) {
        let write = fs.createWriteStream(path);
        let i= 100;
       while( i != 0){
        write.write('este dato se escribe \n');
        i--;
       }
       write.end();
       write.on('finish', ()=>{
           resolve('todos los datos han sido escritos correctamente');
       })
       write.on('error', (error)=>{
           reject(error)
       })


    })
}

let promesa = writers('./entrada.txt');
promesa
    .then((value)=> console.log(value))
    .catch(function (err) {
        console.log(err);
    })


    console.log('mas codigo ejecutandose');