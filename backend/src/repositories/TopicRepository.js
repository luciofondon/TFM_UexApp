
var Promise = require('promise');

var Question = require('../models/QuestionModel'),
	Topic = require('../models/TopicModel');

var projectRepository = require('../repositories/ProjectRepository');

module.exports = {
	createTopicByAplication: function(authUser, topic, aplicationId) {
		return createTopicByAplication(authUser, topic, aplicationId);
	},

	updateTopic: function(authUser, topic) {
		return updateTopic(authUser, topic);
	},

	deleteTopic: function(authUser, topic) {
		return deleteTopic(authUser, topic);
	}
}

function createTopicByAplication(authUser, topic, aplicationId){
	let promise = new Promise(function(resolve, reject){
		topic.aplication = aplicationId; 
		if(validateTopic(topic)){
			topic.save(function(err) {
				if (err) {
					reject({error: 'Cannot save the topic'});
				}
				resolve(topic);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function deleteTopic(authUser, topic){
	let promise = new Promise(function(resolve, reject){
		//Eliminar preguntas asociadas al topic
		Question.remove({topic: topic._id}, function(err){
			topic.remove(function(err){
				resolve({info: 'Delete topic ok'});
			});
		});
	});
	return promise;
}

function updateTopic(authUser, topic){
	let promise = new Promise(function(resolve, reject){
		if(validateTopic(topic)){
			topic.save(function(err) {
				if (err) {
					reject({error: 'Cannot update the topic'});

				}
				resolve(topic);
			});
		}else
		reject({ error: "Parametros de la API no validos"});
	});
	return promise;
}

function validateTopic(topic){
	return true;
}
