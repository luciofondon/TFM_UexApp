
var Promise = require('promise');

var mailService = require('../services/MailService'),
	systemService = require('../services/SystemService'),
	uploadService = require('../services/UploadService');

var User = require('../models/UserModel');
	User = mongoose.model('User');


module.exports = {
	readAllUser: function(authUser) {
		return readAllUser(authUser);
	},

	createUser = function(authUser, user, password) {
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
	},

	signupUser: function(user, password) {
		return signupUser(user, password);
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

function signupUser(user, password){
	let promise = new Promise(function(resolve, reject){
		//Codificar la password
		user.encodePassword(rpassword);
		if(validateUser(user)){
			//Le colocamos el rol de consultor
			Rol.findOne({level:2}).exec(function(err, rol) {
				console.log(rol)
				user.rol = rol._id;
				user.save(function(err) {
					if (err) {
						reject({error: 'Cannot save the user'});
					}
					resolve(user);
				});
			});
		}else
			reject({ error: "Parametros de la API no validos"});
	});
	return promise;
}

function uploadImageUser(authUser, file){
	let promise = new Promise(function(resolve, reject){
		uploadService.uploadImage(file).then(function(name){
			resolve(name);
		}).catch(function(err){
			reject(err);
		});;
	});
	return promise;
}


function validateUser(user){
	var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

	if(user.email == undefined || user.email == "")
		return false;
	else if(user.email.search(patronEmail) != 0)
		return false;
	else if(user.name == undefined || user.name == "")
		return false;
	else if(user.userName == undefined || user.userName == "")
		return false;
	else if((user.phoneNumber != undefined && user.phoneNumber != "") && (user.phoneNumber.length < 9 || !Number.isInteger(parseInt(user.phone))))
		return false;
	else if(user.password == undefined || user.password == "")
		return false;
	return true;
}
