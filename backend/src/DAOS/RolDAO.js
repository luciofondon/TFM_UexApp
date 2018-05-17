/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
_ = require('lodash');

var Rol = require('../models/RolModel');
    Rol = mongoose.model('Rol');

exports.readAllRol = function(req, res) {
    readAllRol(req, res);
}


function readAllRol(req, res){
    Rol.find({}).exec(function(err, roles) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the roles' });
        }
        res.json(roles);
    });
}
