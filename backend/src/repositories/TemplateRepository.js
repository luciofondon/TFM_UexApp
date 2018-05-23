
/**
 *	@author Lucio David Fondon Terron - 2018
 *  @description Funciones que se encargan de manejar el acceso a MongoDB sobre el objeto Template
 */

var Promise = require('promise'),
	path = require('path'),
	fs = require('fs'),
	jsonxml = require('jsontoxml'),
	format = require('xml-formatter');

var Project = require('../models/ProjectModel'),
	Aplication = require('../models/AplicationModel'),
	Topic = require('../models/TopicModel'),
	Question = require('../models/QuestionModel');

var projectRepository = require('../repositories/ProjectRepository');

module.exports = {
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @description Leer todas las plantillas que hay en el sistema
	 */
	readAllTemplates: function(authUser) {
		return readAllTemplate(authUser);
	},
	
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} template Parametros de la plantilla
	 * @param  {} aplication Aplicacion que se desea copiar para generar la plantilla
	 * @description Generar una plantilla a partir de una aplicacion
	 */
	createTemplate: function(authUser, template, aplication) {
		return createTemplate(authUser, template, aplication);
	},
	
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplication Plantilla que se va a eliminar
	 * @description Elimina una plantilla que corresponde a una aplicacion y todos sus topic, preguntas y respuestas
	 */
	deleteTemplate: function(authUser, aplication) {
		return deleteTemplate(authUser, aplication);
	},

	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} aplication Parametro de la nueva aplicacion que se va a crear
	 * @description Genera la plantilla XML a partir de la aplicacion y generar el fichero
	 */
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

function generateTemplateXML(authUser, aplication){
	let promise = new Promise(function(resolve, reject){
		var templateJson = {
			template:
				{ 	name: aplication.name,
					description: aplication.descripction != undefined ? aplication.descripction : "",
					topics:[]
				}
		};

		Topic.find({aplication: aplication._id}).sort({name:1}).then(function(topics) {
			Question.find({topic: {$ne: null}}).populate("answers.questions").then(function(questions) {
				topics.forEach(function(topic){
					let questionsExport = [];
					for(let i = 0; i < questions.length; i++){
						if(questions[i].topic.toString() == topic._id.toString()){
							console.log(questions[i])
							questionsExport.push({
									name: "question",
									text: questions[i].description

							});
						}
					}
					console.log(questionsExport)
					templateJson.template.topics.push({
						name: 'topic',
						attrs: {name: topic.name},
						questions: questionsExport

					});
					console.log(JSON.stringify(templateJson))
				});

				var xml = jsonxml(templateJson);

				var formattedXml = format(xml);
				console.log(formattedXml)

				let timeStamp = new Date().getTime();
				let targetPath = path.join(__dirname,'../../tmp/' + timeStamp + '.xml');
				fs.writeFile(targetPath, formattedXml, function (err) {
					resolve({nameFile: timeStamp + ".xml"});
				});
			});
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
	if(template.name == undefined || template.name == "")
    	return false;
    return true;
}
