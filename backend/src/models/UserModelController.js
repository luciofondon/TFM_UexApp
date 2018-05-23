
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Controlador del modelo User
 */

var crypto = require('crypto');

module.exports = {
	
	/**
	 * @param  {} password Contrasena que se desea codificar
	 * @description Codificar contrasena y almacenarla en el modelo de usuario
	 */
	encodePassword: function(password) {
		let saltGenerate = crypto.randomBytes(16).toString('base64');
		this.salt = saltGenerate;
		if (!password || !this.salt)
			return '';
		this.hashedPassword = crypto.pbkdf2Sync(password, saltGenerate, 10000, 64, 'sha512').toString('base64');
	},
	
	/**
	 * @param  {} password Contrasena que se desea comparar con la del usuario almacenado
	 * @description Comparar una contrasena sin codificar con la codificada del usuario que tiene en BD
	 */
	equalPassword: function(password){
	  	return (crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64') == this.hashedPassword);
	}
};
