
var Promise = require('promise');

var mailService = require('../services/MailService'),
	systemService = require('../services/SystemService');

var User = require('../models/UserModel');
	User = mongoose.model('User');


module.exports = {
	readAllUser: function(authUser) {
		return readAllUser(authUser);
	},

	createUser: function(authUser, user, password) {
		return createUser(authUser, user, password);
	},

	updateUser: function(authUser, user) {
		return updateUser(authUser, user);
	},

	updateMeUser: function(req, res) {
		return updateMeUser(req, res);
	},

	deleteUser: function(authUser, user) {
		return deleteUser(authUser, user);
	},

	resetPasswordUser: function(authUser, user, password) {
		return resetPasswordUser(authUser, user, password);
	},

	loginUser: function(email, password) {
		return loginUser(email, password);
	}
}

function createUser(authUser, user, password){
	let promise = new Promise(function(resolve, reject){
		//Codificar la password
		user.encodePassword(password);
		if(validateUser(user)){
			user.save(function(err) {
				if (err) {
					reject({ error: "Cannot save the user"});
				}
				resolve(user);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function updateUser(authUser, user){
	let promise = new Promise(function(resolve, reject){
		if(validateUser(user)){
			user.save(function(err) {
				if (err) {
					reject({ error: "Cannot save the user"});
				}
				resolve(user);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function updateMeUser(authUser, user){
	let promise = new Promise(function(resolve, reject){
		if(validateUser(user)){
			authUser.name = user.name;
			authUser.lastName = user.lastName;
			authUser.phoneNumber = user.phoneNumber;
			authUser.save(function(err) {
				if (err) {
					reject({ error: "Cannot save the user"});
				}
				resolve(authUser);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function readAllUser(authUser){
	let promise = new Promise(function(resolve, reject){
		let usersFormat = [];
		User.find({},{"__v" : 0}).sort({name:1}).populate("rol").then(function(users){
			users.forEach(function(user){
				let userFormat = JSON.parse(JSON.stringify(user));
				let created = new Date(user.created);
				userFormat.createdFormat = ( "0" + created.getHours()).slice(-2)+":"+ ( "0" + created.getMinutes()).slice(-2)+":"+ ( "0" + created.getSeconds()).slice(-2) + " " + ( "0" + created.getDate()).slice(-2)+"/"+ ( "0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
				usersFormat.push(userFormat);
			});
			resolve(usersFormat);
		}).catch(function(err){
			reject({ error: 'Cannot list all the users' });
		});
	});
	return promise;
}

function deleteUser(authUser, user){
	let promise = new Promise(function(resolve, reject){
		user.remove(function(err) {
			if (err) {
				reject({ error: 'Cannot list all the users' });
			}
			resolve(user);
		});
	});
	return promise;
}

function resetPasswordUser(authUser, user, password){
	let promise = new Promise(function(resolve, reject){
		user.encodePassword(req.body.password);

		// Enviamos el email para avisar del cambio de contraseña y guardamos la nueva contraseña
		user.save(function(err) {
			let body =  "Estimado usuario " + user.name + ",<br/>" +
					"se ha generado una nueva clave para acceder a la plataforma de SmartLight."+
					"<br> La nueva contraseña es: " + req.body.password +
					"<br><br><br> Gracias por su colaboración. <br> <br> Atentamente, reciba un cordial saludo. ";
			mailService.sendMail(user.email, "TFM. Nueva clave de acceso", body);
			resolve(user);
		});
	});
	return promise;
}

function loginUser(email, password){
	let promise = new Promise(function(resolve, reject){
		if(email != undefined && password != undefined){
			User.findOne({email: email.toLowerCase()}, function(err, user) {
				if(err || user == undefined)
					reject({ error: 'Usuario no encontrado' });

				if(!user.equalPassword(req.body.password))
					reject({ error: 'Clave de usuario no valida'});

				resolve({token: systemService.createToken(user)});
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}


function validateUser(user){
	return true;
}
