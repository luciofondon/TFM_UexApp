
var Promise = require('promise');

var User = require('../models/UserModel');
	User = mongoose.model('User');


module.exports = {
	readAllUser: function(authUser) {
		return readAllUser(authUser);
	},

	updateUser: function(authUser, user) {
		return updateUser(authUser, user);
	},

	deleteUser: function(authUser, user) {
		return deleteUser(authUser, user);
	}
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


function validateUser(user){
	return true;
}
