
/**
 *	@author Lucio David Fondon Terron - 2018
 *  @description Funciones que se encargan de manejar el acceso a MongoDB sobre el objeto Rol
 */

var Promise = require('promise');

var Rol = require('../models/RolModel');

module.exports = {
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @description Lee todos los topic disponibles en la plataforma
	 */
	readAllRol: function(authUser) {
		return readAllRol(authUser);
	}
}

function readAllRol(authUser){
	let promise = new Promise(function(resolve, reject){
		Rol.find({}).sort({name:1}).then(function(roles) {
			resolve(roles);
		}).catch(function(err){
			reject({error: 'Cannot list all the roles'});
		});
	});
	return promise;
}
