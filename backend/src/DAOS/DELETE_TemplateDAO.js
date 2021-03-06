/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash'),
    request = require('request'),
	Promise = require('promise'),
	path = require('path');

const fs = require('fs');

var jsonxml = require('jsontoxml');
var format = require('xml-formatter');

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

exports.generateTemplateCSV = function(req, res) {
    generateTemplateCSV(req, res);
};

function generateTemplateCSV(req, res){
	let project = req.project
	var xml = jsonxml({
		template:
			{ 	name:'Nombre Plantilla',
			 	description:'Descripcion',
				 topics:[ 	{	name: 'template',
								text: 'Topic1',
								children: {
									name: "questions",
									children: {
												name: "question",
												text: "¿Esto es una pregunta?"
											}
								},
							},
							{	name: 'template',
								text: 'Topic2',
								attrs: {type:2}
							},
							{	name: 'template',
								text: 'Topic3'
							}
					   ]
			}
	});

	var formattedXml = format(xml);
	console.log(formattedXml)

	let timeStamp = new Date().getTime();
	let targetPath = path.join(__dirname,'../../tmp/' + timeStamp + '.xml');
	fs.writeFile(targetPath, formattedXml, function (err) {
		console.log(targetPath)
		res.json({nameFile: timeStamp + ".xml"});
	});
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


