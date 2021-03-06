/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    mailService = require('../services/MailService'),
    systemService = require('../services/SystemService'),
	fs = require('fs'),
	path = require('path');

var User = require('../models/UserModel');
    User = mongoose.model('User');

var Rol = require('../models/RolModel');
    Rol = mongoose.model('Rol');

var Project = require('../models/ProjectModel');
    Project = mongoose.model('Project');


exports.signupUser = function(req, res) {
    signupUser(req, res);
};

exports.loginUser = function(req, res) {
    loginUser(req, res);
};

exports.uploadImageUser = function(req, res) {
    uploadImageUser(req, res);
};



function uploadImageUser(req, res) {
	var file = req.files.file;
console.log(file)
	//Ruta temporal donde se ha almacenado el fichero
	var tmpPath = file.path;

    // Ruta donde colocaremos las imagenes
	//let target_path = '../../../frontend/images/' + file.name;
	let timeStamp = new Date().getTime();

    let targetPath = path.join(__dirname,'../../../frontend/images/' + timeStamp + "." + file.type.split("/")[1]);

   	// Comprobamos que el fichero es de tipo imagen
    if (file.type.indexOf('image')==-1){
    	res.send('El fichero que deseas subir no es una imagen');
    } else {
         // Movemos el fichero temporal tmp_path al directorio que hemos elegido en target_path
        fs.rename(tmpPath, targetPath, function(err) {
			if (err)
				res.status(500).json({error: "Se ha producido un error al subir la imagen"});

            // Eliminamos el fichero temporal
            fs.unlink(tmpPath, function() {
				if (err)
					res.status(500).json({error: "Se ha producido un error al subir la imagen"});
                res.json({name: file.name});
            });
         });
     }
}
/*
function updateMeUser(req, res){
	let user = req.authUser;
	user.name = req.body.name;
	user.lastName = req.body.lastName;
	user.phoneNumber = req.body.phoneNumber;
	user.save(function(err) {
		if (err) {
			return res.status(500).json({error: 'Cannot save the user'});
		}
		res.json(user);
	});
}*/

function loginUser(req, res){
	console.log(req.body)
    if(req.body.email != undefined && req.body.password != undefined){
        User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
            if(err || user == undefined)
                return res.status(500).json({ error: 'Usuario no encontrado' });

            if(!user.equalPassword(req.body.password))
                return res.status(500).json({ error: 'Clave de usuario no valida'});

            return res.status(200).send({token: systemService.createToken(user)});
        });
    }
}

function signupUser(req, res){
	let user = new User(req.body);
    //Codificar la password
    user.encodePassword(req.body.password);
    if(validateUser(user)){
		//Le colocamos el rol de consultor
		Rol.findOne({level:2}).exec(function(err, rol) {
			console.log(rol)
			user.rol = rol._id;
			user.save(function(err) {
				if (err) {
					return res.status(500).json({error: 'Cannot save the user'});
				}
				res.json(user);
			});
		});
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}
/*
function readAllUser(req, res){
    let usersFormat = [];
    User.find({},{"__v" : 0}).sort({name:1}).populate("rol").exec(function(err, users){
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the users' });
        }
		users.forEach(function(user){
			let userFormat = JSON.parse(JSON.stringify(user));
			let created = new Date(user.created);
			userFormat.createdFormat = ( "0" + created.getHours()).slice(-2)+":"+ ( "0" + created.getMinutes()).slice(-2)+":"+ ( "0" + created.getSeconds()).slice(-2) + " " + ( "0" + created.getDate()).slice(-2)+"/"+ ( "0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
			usersFormat.push(userFormat);
		});
		res.json(usersFormat);
	});
}
*/

/*
function createUser(req, res){
    let user = new User(req.body);
    //Codificar la password
    user.encodePassword(req.body.password);
    if(validateUser(user)){
        user.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot save the user'});
            }
            res.json(user);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}*/

/*
function updateUser(req, res){
	let user = _.extend(req.user, req.body);
	console.log(user)
    if(validateUser()){
        User.findOneAndUpdate({_id: user._id}, req.body, {upsert:true}, function(err, user){
            if (err){
				console.log(err)
                return res.status(500).json({ error: 'Cannot list all the users' });
            }
            return res.send("succesfully saved");
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}*/


/*

function deleteUser(req, res){
    var user = req.user;
    user.remove(function(err) {
        if (err) {
            return res.status(500).json({error: 'Cannot delete the user'});
        }
        res.json(user);
    });
}*/
/*
function resetPasswordUser(req, res){
    User.findOne({_id: req.params.userId}, function(err, user) {
        if (err || user == undefined) {
            return res.status(400).json({msg: 'Failed to load User'});
        }
        user.encodePassword(req.body.password);

        // Enviamos el email para avisar del cambio de contraseña y guardamos la nueva contraseña
        user.save(function(err) {
            let body =  "Estimado usuario " + user.name + ",<br/>" +
                    "se ha generado una nueva clave para acceder a la plataforma de SmartLight."+
                    "<br> La nueva contraseña es: " + req.body.password +
                    "<br><br><br> Gracias por su colaboración. <br> <br> Atentamente, reciba un cordial saludo. ";
            mailService.sendMail(user.email, "SmartLIGHT. Nueva clave de acceso", body);
            res.json(user);
        });
    });
}*/

function validateUser(user){
    return true;
}
