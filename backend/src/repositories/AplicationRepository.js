
var Promise = require('promise'),
	fs = require('fs'),
	xml2js = require('xml2js'),
	path = require('path'),
	convert = require('xml-js');

var Project = require('../models/ProjectModel'),
	Aplication = require('../models/AplicationModel'),
	Topic = require('../models/TopicModel'),
	Question = require('../models/QuestionModel');

var projectRepository = require('../repositories/ProjectRepository');

module.exports = {
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @description Lee todas las aplicaciones de la BD
	 */
	readAllAplication: function(authUser) {
		return readAllAplication(authUser);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplication Nueva aplicacion que se va a crear
	 * @description Crea una nueva aplicacion
	 */
	createAplication: function(authUser, aplication) {
		return updateAplication(authUser, aplication);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplication Aplicacion que se va actualizar
	 * @description Actualiza una aplicacion
	 */
	updateAplication: function(authUser, aplication) {
		return updateAplication(authUser, aplication);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplication
	 * @description Elimina una aplicacion de la BD
	 */
	deleteAplication: function(authUser, aplication) {
		return deleteAplication(authUser, aplication);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplication Datos generares de los atributos de la aplicacion
	 * @param  {} template Aplicacion que esta almacenada como plantilla (isTemplate = true)
	 * @description Generar una nueva aplicacion a partir de una plantilla (es una aplicacion), asignandole todos sus parametros (topic, preguntas y respuestas)
	 */
	generateAplication(authUser, aplication, template){
		return generateAplication(authUser, aplication, template);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} nameFile Nombre del fichero XML que contiene los atributos de la aplicacion
	 * @description Crea una nueva aplicacion en BD leyendo los atributos a partir de un fichero XML
	 */
	generateAplicationFromXML(authUser, nameFile){
		return generateAplicationFromXML(authUser, nameFile);
	}

}

function readAllAplication(authUser){
	let promise = new Promise(function(resolve, reject){
		projectRepository.readAllProject(authUser).then(function(projects){
			let projectsIds = [];
			projects.forEach(function(project){
				projectsIds.push(project._id);
			});

			Aplication.find({isTemplate: false, project: {$in: projectsIds}}).populate("project").sort({name:1}).then(function(aplications) {
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
			Topic.remove({aplication: aplication._id}, function(err){
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
		let aplicationCopy = JSON.parse(JSON.stringify(template));
		let aplicationTemplate = new Aplication(aplicationCopy);
		aplicationTemplate.isTemplate = false;
		aplicationTemplate.name = aplication.name;
		aplicationTemplate.description = aplication.description;
		aplicationTemplate.key = aplication.key;
		aplicationTemplate.project = aplication.project;
		aplicationTemplate.creator = authUser._id;
		aplicationTemplate.nameTemplate = undefined;
		aplicationTemplate._id = mongoose.Types.ObjectId();
		console.log(aplicationTemplate)

		aplicationTemplate.save(function(err){
			console.log(err)
			if (err) {
				reject({ error: "Cannot save the aplication"});
			}
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

function generateAplicationFromXML(authUser, nameFile){
	let promise = new Promise(function(resolve, reject){
		var parser = new xml2js.Parser();
		let targetPath = path.join(__dirname,'../../tmp/' + nameFile);
		console.log(targetPath)
		fs.readFile(targetPath, function(err, data) {
			//parser.parseString(data, function (err, result) {
			console.log(data)
			var format = convert.xml2json(data, {compact: true, spaces: 4});
			let template = JSON.parse(format);
			template.root.topics.forEach(function(topic){
				console.log(topic)
				console.log(topic.name._text)

				console.log(topic.questions)

				//let topic = new Topic({description: topic.name._text});
				if(topic.questions.length > 0){
					topic.questions.forEach(function(question){
						console.log(question)

					});
				}
			});
				//resolve();
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
