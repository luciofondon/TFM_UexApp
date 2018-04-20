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
	console.log(req.project)

	var projectCopy = JSON.parse(JSON.stringify(req.project));

	var projectTemplate = new Project(projectCopy);
	projectTemplate.isTemplate = true;
	projectTemplate._id = mongoose.Types.ObjectId();;
	projectTemplate.save(function(err) {
		if (err) {
			return res.status(500).json({error: 'Cannot save the project'});
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
