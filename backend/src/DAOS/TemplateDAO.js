/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
	Promise = require('promise');

var Project = require('../models/ProjectModel'),
	Project = mongoose.model('Project');

var Topic = require('../models/TopicModel'),
	Topic = mongoose.model('Topic');

var Question = require('../models/QuestionModel'),
	Question = mongoose.model('Question');

exports.createTemplate = function(req, res) {
    createTemplate(req, res);
};

exports.readAllTemplate = function(req, res) {
    readAllTemplate(req, res);
};

exports.deleteTemplate = function(req, res) {
    deleteTemplate(req, res);
};

exports.downloadTemplate = function(req, res) {
    downloadTemplate(req, res);
};

function downloadTemplate(req, res){
	res.download('/report-12345.pdf', 'report.pdf');
}

function createTemplate(req, res){
	let template = req.body;
	let projectCopy = JSON.parse(JSON.stringify(req.project));
	let projectTemplate = new Project(projectCopy);
	projectTemplate.isTemplate = true;
	projectTemplate.creator = undefined;
	projectTemplate.nameTemplate = template.name;
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

/*
	Promise.all(promisesTopic).then(function(values){
	}).catch(function(err){
	});
*/

function readAllTemplate(req, res){
    // Comprobar los proyectos a los que el usuario tiene permisos
    Project.find({isTemplate: true}).sort({name:1}).exec(function(err, projects) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the projects' });
        }
        res.json(projects);
    });
}

function deleteTemplate(req, res){
	var project = req.project;
	Topic.find({project: project._id}, {"__v":0}).exec(function(err, topics){
		topics.forEach(function(topic){
			console.log("Eliminar " + topic._id)
			Question.remove({topic: topic._id}, function(err){

			});
		});
		Topic.remove({project: project._id}, function(err){
			project.remove(function(err){
				if (err) {
					return res.status(500).json({error: 'Cannot delete the user'});
				}
				res.json(project);
			});
		});
	});
}

function validateTemplate(template){
    return true;
}
