
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Servicio para crear un token de usuario
 */

var jwt = require('jwt-simple'),
	moment = require('moment'),
	config = require('../../config/config');

/**
 * @param  {} user Usuario al que se le creara el token
 * @description Codificacion de un token mediante la libreria jwt-simple 
 */
exports.createToken = function(user) {
	//moment se utiliza para obtener la fecha en formato UNIX
	var payload = {
	    sub: user._id,
	    iat: moment().unix(),
	    exp: moment().add(14, "days").unix(),
	};
  	return jwt.encode(payload, config.TOKEN_SECRET);
};