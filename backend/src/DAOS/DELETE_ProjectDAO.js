/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request');

var Project = require('../models/ProjectModel');
var Topic = require('../models/TopicModel');
var Question = require('../models/QuestionModel');

module.exports = {
	readAllProject: function(req, res) {
		readAllProject(req, res);
	}
}


function generateProject(req, res){
	let template = req.body;
	let project = req.project;
	let projectCopy = JSON.parse(JSON.stringify(project));
	let projectTemplate = new Project(projectCopy);
	projectTemplate.isTemplate = false;
	projectTemplate.creator = req.authUser._id;
	projectTemplate.nameTemplate = undefined;
	projectTemplate._id = mongoose.Types.ObjectId();
	projectTemplate.save(function(err){
		Topic.find({project: projectCopy._id}, {"__v":0}).exec(function(err, topics){
			topics.forEach(function(topic){
				let topicCopy = JSON.parse(JSON.stringify(topic));
				let topicTemplate = new Topic(topicCopy);
				topicTemplate.project = projectTemplate._id;
				topicTemplate._id = mongoose.Types.ObjectId();
				topicTemplate.save(function(err){
					Question.find({topic: topicCopy._id}, {"__v":0}).exec(function(err, questions){
						questions.forEach(function(question){
							let questionCopy = JSON.parse(JSON.stringify(question));
							let questionTemplate = new Question(questionCopy);
							questionTemplate._id = mongoose.Types.ObjectId();
							questionTemplate.topic = topicTemplate._id;
							questionTemplate.save();
						});

					});
				});
			});
			res.json({state: "ok"});
		});
	});
}

function readAllProject(req, res){
    // Comprobar los proyectos a los que el usuario tiene permisos
	var filter = {};
	if(req.authUser.rol.level == 1)
	   	filter = {isTemplate: false};
	else
		filter = {isTemplate: false, creator: req.authUser._id}

    Project.find(filter).sort({name:1}).exec(function(err, projects) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the projects' });
        }
        res.json(projects);
    });
}




function validateProject(project){
    return true;
}
