var Promise = require('promise');

var Rol = require('../models/RolModel');

module.exports = {
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
