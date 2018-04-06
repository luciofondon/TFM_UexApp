var jwt = require('jwt-simple'),
	moment = require('moment'),
	config = require('../../config/config');

//Codificacion de un token mediante la libreria jwt-simple 
exports.createToken = function(user) {
	//moment se utiliza para obtener la fecha en formato UNIX
	var payload = {
	    sub: 'idUser',//user._id,
	    iat: moment().unix(),
	    exp: moment().add(14, "days").unix(),
	};
  	return jwt.encode(payload, config.TOKEN_SECRET);
};