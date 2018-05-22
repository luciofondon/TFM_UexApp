
var Promise = require('promise');


var Project = require('../models/ProjectModel'),
	Aplication = require('../models/AplicationModel'),
	Topic = require('../models/TopicModel');

//var aplicationRepository = require('../repositories/AplicationRepository');

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
				promisesDeleteAplications.push(AplicationRepositoryRepository.deleteAplication(aplication._id));
			})

			Promise.all(promisesDeleteAplications).then(function(data){
				Project.remove({_id: project._id}, function(err){
					if (err) {
						reject({error: 'Cannot delete the project'});
					}
					resolve(project);
				});
			}).catch(function(err){
				reject({error: 'Cannot delete the project'});
			});

		}).catch(function(err){
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
	if(project.name == undefined || project.name == "")
		return false;
	else if(project.key == undefined || project.key == "")
		return false;
	else if(project.description == undefined || project.description == "")
		return false;
	return true;
}
