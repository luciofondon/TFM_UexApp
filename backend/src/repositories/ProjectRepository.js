
var Promise = require('promise');

<<<<<<< HEAD
var Project = require('../models/ProjectModel');
var Aplication = require('../models/AplicationModel');
var Topic = require('../models/TopicModel');
=======
var Project = require('../models/ProjectModel'),
	Aplication = require('../models/AplicationModel'),
	Topic = require('../models/TopicModel');

//var aplicationRepository = require('../repositories/AplicationRepository');

>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5

module.exports = {
	readAllProject: function(authUser) {
		return readAllProject(authUser);
	},

	createProject: function(authUser, project) {
		return updateProject(authUser, project);
	},

	updateProject: function(authUser, project) {
		return updateProject(authUser, project);
	},

	deleteProject: function(authUser, project) {
		return deleteProject(authUser, project);
	}
}

function readAllProject(authUser){
	let promise = new Promise(function(resolve, reject){
		// Comprobar los proyectos a los que el usuario tiene permisos
		var filter = {};
		if(authUser.rol.level == 1)
			filter = {};
		else
			filter = {creator: authUser._id}

		Project.find(filter).sort({name:1}).then(function(projects) {
			resolve(projects);
		}).catch(function(err){
			reject({error: 'Cannot list all the projects'});
		});
	});
	return promise;
}


function deleteProject(authUser, project){
	let promise = new Promise(function(resolve, reject){
		Aplication.find({project: project._id}, {"__v":0}).then(function(aplications){
			let promisesDeleteAplications = [];
			aplications.forEach(function(aplication){
<<<<<<< HEAD
				promisesDeleteAplications.push(AplicationRepositoryRepository.deleteAplication(aplication._id));
			})
			Promise.all(promisesDeleteAplications).then(function(data){
				Project.remove({_id: project._id}, function(err){
					/*if (err) {
						reject({error: 'Cannot delete the project'});
					}*/
=======
				//promisesDeleteAplications.push(aplicationRepository.deleteAplication(authUser, aplication._id));
			});
			Promise.all(promisesDeleteAplications).then(function(data){
				Project.remove({_id: project._id}, function(err){
					if (err) {
						reject({error: 'Cannot delete the project'});
					}
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
					resolve(project);
				});
			}).catch(function(err){
				reject({error: 'Cannot delete the project'});
			});
<<<<<<< HEAD
		}).then(function(err){
=======
		}).catch(function(err){
			console.log(err)

>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
			reject({error: 'Cannot delete the project'});
		});
	});
	return promise;
}

function updateProject(authUser, project){
	project.creator = authUser._id;
	let promise = new Promise(function(resolve, reject){
		if(validateProject(project)){
			project.save(function(err) {
				if (err) {
					reject({ error: "Cannot save the project"});
				}
				resolve(project);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function validateProject(project){
<<<<<<< HEAD
	if(project.name == undefined || project.name == "")
		return false;
	else if(project.key == undefined || project.key == "")
		return false;
	else if(project.description == undefined || project.description == "")
		return false;
=======
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
	return true;
}
