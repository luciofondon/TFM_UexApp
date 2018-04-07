/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request');

var Template = require('../models/TemplateModel');
	Template = mongoose.model('Template');

exports.readAllTemplate = function(req, res) {
    readAllTemplate(req, res);
};

exports.createTemplate = function(req, res) {
    createTemplate(req, res);
};

exports.updateTemplate = function(req, res) {
    updateTemplate(req, res);
};



function readAllTemplate(req, res){
    // Comprobar los proyectos a los que el usuario tiene permisos
    Template.find({}).sort({name:1}).exec(function(err, templates) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the projects' });
        }
        res.json(templates);
    });
}

function updateTemplate(req, res){
    let template = _.extend(req.template, req.body);
    if(validateTemplate(template)){
        template.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot update the project'});
            }

            res.json(template);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}



function createTemplate(req, res){
    let template = new Template(req.body);
    if(validateTemplate(template)){
        template.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot save the project'});
            }
            // Asignar el proyecto al usuario que lo ha creado

            res.json(template);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}



function validateTemplate(template){
    return true;
}
