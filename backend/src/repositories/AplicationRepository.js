var Promise = require('promise');

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

function validateAplication(aplication){
	return true;
}
