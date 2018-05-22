var Promise = require('promise'),
	mongoose = require('mongoose');

var Project = require('../models/ProjectModel'),
	Aplication = require('../models/AplicationModel'),
	Topic = require('../models/TopicModel');

var projectRepository = require('../repositories/ProjectRepository');

module.exports = {

	readAllAplication: function(authUser) {
		return readAllAplication(authUser);
	},

	createAplication: function(authUser, aplication) {
		return updateAplication(authUser, aplication);
	},

	updateAplication: function(authUser, aplication) {
		return updateAplication(authUser, aplication);
	},

	deleteAplication: function(authUser, aplication) {
		return deleteAplication(authUser, aplication);
	},

	generateAplication(authUser, aplication, template){
		return generateAplication(authUser, aplication, template);
	}

}

function readAllAplication(authUser){
	let promise = new Promise(function(resolve, reject){
		projectRepository.readAllProject(authUser).then(function(projects){
			let projectsIds = [];
			projects.forEach(function(project){
				projectsIds.push(project._id);
			});
			Aplication.find({project: {$in: projectsIds}}).populate("project").sort({name:1}).then(function(aplications) {
				resolve(aplications);
			}).catch(function(err){
				reject({error: 'Cannot list the aplications'});
			});
		}).catch(function(err){
			reject({error: 'Cannot list the aplications'});
		});
	});
	return promise;
}

function deleteAplication(authUser, aplication){
	let promise = new Promise(function(resolve, reject){
		Topic.find({aplication: aplication._id}, {"__v":0}).then(function(topics){
			topics.forEach(function(topic){
				Question.remove({topic: topic._id}, function(err){
				});
			});
			Topic.remove({aplication: aplication_.id}, function(err){
				Aplication.remove({_id: aplication._id}, function(err){
					if (err) {
						reject({error: 'Cannot delete the aplication'});
					}
					resolve(aplication);
				});
			});
		}).catch(function(err){
			reject({error: 'Cannot delete the aplication'});
		});
	});
	return promise;
}

function updateAplication(authUser, aplication){
	let promise = new Promise(function(resolve, reject){
		if(validateAplication(aplication)){
			aplication.save(function(err) {
				if (err) {
					reject({ error: "Cannot save the aplication"});
				}
				resolve(aplication);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function generateAplication(authUser, aplication, template){
	let promise = new Promise(function(resolve, reject){
		let aplicationCopy = JSON.parse(JSON.stringify(aplication));
		let aplicationTemplate = new Aplication(aplicationCopy);
		aplicationTemplate.isTemplate = false;
		aplicationTemplate.creator = authUser._id;
		aplicationTemplate.nameTemplate = undefined;
		aplicationTemplate._id = mongoose.Types.ObjectId();
		aplicationTemplate.save(function(err){
			Topic.find({aplication: aplicationCopy._id}, {"__v":0}).exec(function(err, topics){
				topics.forEach(function(topic){
					let topicCopy = JSON.parse(JSON.stringify(topic));
					let topicTemplate = new Topic(topicCopy);
					topicTemplate.aplication = aplicationTemplate._id;
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

function validateAplication(aplication){
	if(aplication.name == undefined || aplication.name == "")
		return false;
	else if(aplication.description == undefined || aplication.description == "")
		return false;
	else if(aplication.project == undefined || aplication.project == "")
		return false;
	return true;
}
