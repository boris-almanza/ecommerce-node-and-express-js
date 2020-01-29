let fs = require('fs');

let escribir = fs.createWriteStream('./data.txt', 'utf8');
let i=0;
let data = "boris ama a gissel y a su porotita lucia \n";

while(i != 500){
    //metemos datos al buffer con el metodo write()
    // devolvera true si no se excede el tamanño del buffer
    if (escribir.write(data)) {
        console.log('escribiendo..'+ (i+1));
        escribir.once('error',( error)=>{
            if(error){
                console.error('SE ENCONTRO UN error');
                console.error(error);
            }
            
        });
    } else {
        console.log('parando...'+ (i+1));
        
    }
   
    i++;
   

}
escribir.on('drain',()=>{
    console.log('dreanando..');
})

escribir.on('close',()=>console.log("cerrando del flujo"));
escribir.on('finish',()=>console.log("los datos han sido eliminado del buffer"));
escribir.end();
