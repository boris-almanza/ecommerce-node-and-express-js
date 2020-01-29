let mongo = require('mongoose');

function connect(){
    let uri= 'mongodb://localhost/miPrimeraBBDD';
    mongo.connect(uri);
    
}