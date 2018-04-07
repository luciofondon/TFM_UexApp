var jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('../../config/config');

//Comprobar que en la ruta /api el usuario esta autenticado (este middlware se lanza en cada peticion)
exports.ensureAuthenticated = function(req, res, next) {
  console.log("Entra")
  /*if(!req.headers.authorization) {
    return res.status(403).send({message: "Tu petición no tiene cabecera de autorización"});
  }
  
  //Obtenemos el token del usuario y lo decodificamos
  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, config.TOKEN_SECRET);
  
  //Comprobamos que no haya expirado el token
  if(payload.exp <= moment().unix()) {
     return res.status(401).send({message: "El token ha expirado"});
  }
  
  //En el payload del token esta el identificador del usuario
  req.user = payload.sub;*/
  next();
}