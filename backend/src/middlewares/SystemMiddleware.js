/**
 * @author GammaSolutions - Departamento i + d - 2018
 * @description Middleware para comprobar que todas las llamadas HTTP tienen un token valido y controlar el acceso por rol
 */

var config = require('../../config/config');
var jwt = require('jwt-simple');
var moment = require('moment');
var mongoose = require('mongoose');
var User = require('../models/UserModel');
var Rol = require('../models/RolModel');

User = mongoose.model('User');
Rol = mongoose.model('Rol');

exports.ensureAuthenticated = function(req, res, next){
	ensureAuthenticated(req, res, next);
};

exports.rolAdmin = function(req, res, next){
	rolAdmin(req, res, next);
};

exports.rolOperador = function(req, res, next){
	rolOperador(req, res, next);
};

exports.rolConsultor = function(req, res, next){
	rolConsultor(req, res, next);
};

exports.forbidden = function(req, res, next){
	forbidden(req, res, next);
};

//Comprobar que en la ruta /api el usuario esta autenticado (este middlware se lanza en cada peticion)
function ensureAuthenticated(req, res, next) {
    if(!req.headers.authorization) {
        unauthorized(req, res, next);
    } else {
        //Obtenemos el token del usuario y lo decodificamos
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt.decode(token, config.TOKEN_SECRET);

        //Comprobamos que no haya expirado el token
        if(payload.exp <= moment().unix()) {
            return res.status(401).send({message: "El token ha expirado"});
        }
        //En el payload del token esta el identificador del usuario
        req.authUserId = payload.sub;
        req.authUser = null;

        User.load(req.authUserId, function(err, user) {
            if (err)
                return res.status(500).json(err);
            if (user == undefined)
                return res.status(500).json({error: 'El identificador '+ req.authUserId +' no existe'});

            //Todas las peticiones tienen disponible el usuario
            req.authUser = user;
            next();
        });
    }
}

function rolAdmin(req, res, next){
    if (req.authUser.rol.level == 1){
        next();
    } else {
        forbidden(req, res, next);
    }
}

function rolOperador(req, res, next){
    if (req.authUser.rol.level <= 2){
        next();
    } else {
        forbidden(req, res, next);
    }
}

function rolConsultor(req, res, next){
    if (req.authUser.rol.level <= 4){
        next();
    } else {
        forbidden(req, res, next);
    }
}

function forbidden(req, res, next){
	console.log("Acceso denegado");
	return res.status(403).send({message: "No tiene permisos para acceder al recurso"});
}

function unauthorized(req, res, next){
	console.log("Unauthorized");
	return res.status(401).send({message: "Usuario no autorizado"});
}
