/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request');

var Project = require('../models/ProjectModel');
	Project = mongoose.model('Project');

exports.createTemplate = function(req, res) {
    createTemplate(req, res);
};

exports.readAllTemplate = function(req, res) {
    readAllTemplate(req, res);
};

function createTemplate(req, res){
	let template = req.body;
	let projectCopy = JSON.parse(JSON.stringify(req.project));
	let projectTemplate = new Project(projectCopy);
	projectTemplate.isTemplate = true;
	projectTemplate.nameTemplate = template.name;
	projectTemplate._id = mongoose.Types.ObjectId();
	projectTemplate.save(function(err) {
		if (err) {
			return res.status(500).json({error: 'Cannot save the template'});
		}
		res.json(projectTemplate);
	});
}

function readAllTemplate(req, res){
    // Comprobar los proyectos a los que el usuario tiene permisos
    Project.find({isTemplate: true}).sort({name:1}).exec(function(err, projects) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the projects' });
        }
        res.json(projects);
    });
}

function validateTemplate(template){
    return true;
}
