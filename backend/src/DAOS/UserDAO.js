/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    mailService = require('../services/MailService'),
    systemService = require('../services/SystemService');

var User = require('../models/UserModel');
    User = mongoose.model('User');

var Rol = require('../models/RolModel');
    Rol = mongoose.model('Rol');

var Project = require('../models/ProjectModel');
    Project = mongoose.model('Project');

exports.readAllUser = function(req, res) {
    readAllUser(req, res);
}

exports.createUser = function(req, res) {
    createUser(req, res);
}

exports.updateUser = function(req, res) {
    updateUser(req, res);
}

exports.deleteUser = function(req, res) {
    deleteUser(req, res);
}

exports.resetPasswordUser = function(req, res) {
resetPasswordUser(req, res);
}

exports.loginUser = function(req, res) {
    loginUser(req, res);
}


function loginUser(req, res){
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


function readAllUser(req, res){
    let usersFormat = [];
    User.find({}).sort({name:1}).exec(function(err, users) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the users' });
        }
        Rol.find({}).exec(function(err, roles) {
                    
                    users.forEach(function(user){
                        let userFormat = JSON.parse(JSON.stringify(user));
                        let created = new Date(user.created);
                        userFormat.createdFormat = ( "0" + created.getHours()).slice(-2)+":"+ ( "0" + created.getMinutes()).slice(-2)+":"+ ( "0" + created.getSeconds()).slice(-2) + " " + ( "0" + created.getDate()).slice(-2)+"/"+ ( "0" + (created.getMonth()+1)).slice(-2)+"/"+created.getFullYear();
                        
                        //Asignar nombre del rol
                        for(let i = 0; i <  roles.length ; i++){ 
                            if(user.role != undefined)
                                if(roles[i]._id.toString() == user.role.toString()){
                                    userFormat.rolName = roles[i].name;
                                    break;
                                }
                        }

                       
                        usersFormat.push(userFormat);
                    });
                    res.json(usersFormat);
                });
            });
     
}


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
}

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
}


function updateUser(req, res){
    let user = _.extend(req.user, req.body);
    if(validateUser()){
        User.findOneAndUpdate({_id: user._id}, req.body, {upsert:true}, function(err, user){
            if (err){
                return res.status(500).json({ error: 'Cannot list all the users' });
            } 
            return res.send("succesfully saved");
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}


function deleteUser(req, res){
    var user = req.user;
    user.remove(function(err) {
        if (err) {
            return res.status(500).json({error: 'Cannot delete the user'});
        }
        res.json(user);
    });
}

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
}

function validateUser(user){
    return true;
} 
