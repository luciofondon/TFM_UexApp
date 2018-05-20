
var Promise = require('promise'),
	path = require('path'),
	fs = require('fs'),
	jsonxml = require('jsontoxml'),
	format = require('xml-formatter');

var Project = require('../models/ProjectModel'),
	Aplication = require('../models/AplicationModel'),
	Topic = require('../models/TopicModel')
	Question = require('../models/QuestionModel');

var projectRepository = require('../repositories/ProjectRepository');

module.exports = {
	readAllTemplates: function(authUser) {
		return readAllTemplate(authUser);
	},

	createTemplate: function(authUser, template, aplication) {
		return createTemplate(authUser, template, aplication);
	},

	deleteTemplate: function(authUser, aplication) {
		return deleteTemplate(authUser, aplication);
	},

	generateTemplateXML: function(authUser, aplication){
		return generateTemplateXML(authUser, aplication);
	}
}

function readAllTemplate(authUser){
	let promise = new Promise(function(resolve, reject){
		Aplication.find({isTemplate: true}).sort({name:1}).then(function(projects) {
			resolve(projects);
		}).catch(function(err){
			reject({error: 'Cannot list all the projects'});
		});
	});
	return promise;
}

function createTemplate(authUser, template, aplication){
	let promise = new Promise(function(resolve, reject){
		let aplicationCopy = JSON.parse(JSON.stringify(aplication));
		let aplicationTemplate = new Aplication(aplicationCopy);
		aplicationTemplate.isTemplate = true;
		aplicationTemplate.creator = undefined;
		aplicationTemplate.nameTemplate = template.name;
		aplicationTemplate._id = mongoose.Types.ObjectId();
		aplicationTemplate.save(function(err){
			Topic.find({aplication: aplicationCopy._id}, {"__v":0}).exec(function(err, topics){
				topics.forEach(function(topic){
					let topicCopy = JSON.parse(JSON.stringify(topic));
					let topicTemplate = new Topic(topicCopy);
					topicTemplate.project = aplicationTemplate._id;
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
				resolve({state: "ok"});
			});
		});

	});
	return promise;
}

function generateTemplateXML(authUser, aplication){
	let promise = new Promise(function(resolve, reject){
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
			resolve({nameFile: timeStamp + ".xml"});
		});
	});
	return promise;
}

function deleteTemplate(authUser, aplication){
	let promise = new Promise(function(resolve, reject){
		projectRepository.deleteProject(authUser, project).then(function(data){
			resolve(data);
		}).catch(function(err){
			reject(err);
		});
	});
	return promise;
}

function validateTemplate(template){
    return true;
}
