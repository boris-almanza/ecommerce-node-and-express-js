//requerimos passport , el modelo usuario y la estratgia a emplear

const passport = require('passport');
/*
devido a que todos los modelos tienen uan propiedad unnica _id
se usara este _id para tu traduccion en serialize()
*/
const User = require('./models/user');
const LocalStrategy = require('passport-local').Strategy
// exportamos una unica funcion 



module.exports = function() {

/*serialize determina que datos del usuario  deben ser almacenados en la sesion
y como resultado de esta funcion es agregado a la session como req.session.passport.user --> { id: nf345werf}
*/
 passport.serializeUser(function(user, done){
      done(null, user._id); // => este id es guradado en la session
    })                       // y es luego usado para recuperar el objeto completo via deserializeUser()


/*
El primer argumento para esta funcion corresponde a la clave del objeto usuario que fue dado en la funcion dane de 
serializeUser() , con esta clave se recupera el objeto completo

*/
    passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){   // en esta funcion la clave es igualada a alguna que se encuentra en la BBDD
        done(err, user);                       // y el objeto obtenido se adjunta a la solicitud como req.user
      })
    })
 


// step 1:

/*
passport toma los valores de req.body.username y req.body.password
y lo pasa a nuestra funcion de verificacion en local Strategy
*/
passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'email'
  },
    //==== Callback verify=====
  function(username, password, done){
    User.findOne({email: username}, function(err, user){
      if(err) {return done(err)};
      if(!user){
        return done(null, false);
      } else{
        user.checkPassword(password, function(err, isMatch){
          if(err) {return done(err)};
          if(isMatch){
            return done(null, user);
          } else {
            return done(null ,false);
          }
        })
      }
    })


  }


))
  /*====== VERIFY CALLBACK====
    El proposito del callback verify es encontror el usuario que posee las credenciales
    Cuando passport autentica una solicitud , el analiza las credenciales que contiene la solicitud
    y entonces INVOCA !!! al callback verificador con esas credenciales como argumentos

/*


    /*#"############serializaUser=============*
    // Aca le decimos a passport como obtener datos de usuario desde la session
    El trabajo del metodo serializeUser() es determinar que datos 
    desde el objeto user  deberian ser almacenados en la session.

    El resultado de serializarUser() es agregado a la session como:
    req.session.passport.user={ }
    ademas este resultado tambien es agregado a request como:
    req.user 
    */
   


}