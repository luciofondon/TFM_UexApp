
/**
 *	@author Lucio David Fondon Terron - 2018
 *  @description Funciones que se encargan de manejar el acceso a MongoDB sobre el objeto Question
 */

var Promise = require('promise');

var Question = require('../models/AplicationModel');

module.exports = {
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} topicId
	 * @description
	 */
	readAllByTopic: function(authUser, topicId) {
		return readAllByTopic(authUser, topicId);
	},
	
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} question
	 * @param  {} topicId
	 * @description
	 */
	createByTopic: function(authUser, question, topicId) {
		return createByTopic(authUser, question, topicId);
	},
	
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} question
	 * @param  {} questionAsociate
	 * @description
	 */
	createQuestionAsociate: function(authUser, question, questionAsociate) {
		return createQuestionAsociate(authUser, question, questionAsociate);
	},
	
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} question Pregunta que se desa actualizar
	 * @description Actualiza una pregunta
	 */
	updateQuestion: function(authUser, question) {
		return updateQuestion(authUser, question);
	},
	
	/**
	 * @param  {} authUser Usuario que ha hecho login y que esta realizando la peticion
	 * @param  {} question Pregunta que se desea eliminar
	 * @description Elimina una pregunta de la BD
	 */
	deleteQuestion: function(authUser, question) {
		return deleteQuestion(authUser, question);
	}
}

function readAllByTopic(authUser, topicId){
	let promise = new Promise(function(resolve, reject){
		Question.find({topic: req.params.topicId}).sort({name:1}).exec(function(err, questions) {
			if (err) {
				reject({ error: 'Cannot list all the topics' });
			}
			resolve(questions);
		});
	});
	return promise;
}

function createByTopic(authUser, question, topicId){
	let promise = new Promise(function(resolve, reject){
    	question.topic = topicId
		if(validateQuestion(question)){
			question.save(function(err) {
				if (err) {
					rreject({error: 'Cannot save the question'});
				}
				resolve(question);
			});
		}else
		reject({ error: "Parametros de la API no validos"});
	});
	return promise;
}

function createQuestionAsociate(authUser, question, questionAsociate){
	let promise = new Promise(function(resolve, reject){
		question.answers.forEach(function(answer){
			if(answer._id.toString() == req.params.answerId.toString()){
				answer.questions.push(questionAsociate._id);
			}
		});

		questionAsociate.save(function(err) {
			if (err) {
				reject({error: 'Cannot update the question'});
			}
			question.save(function(err) {

				if (err) {
					reject({error: 'Cannot update the question'});
				}
				resolve(question);
			});
		});
	});
	return promise;
}

function updateQuestion(authUser, question){
	let promise = new Promise(function(resolve, reject){
		if(validateQuestion(question)){
			question.save(function(err) {
				if (err) {
					reject({error: 'Cannot update the question'});
				}
				resolve(question);
			});
		}else
			reject({ error: "Parametros de la API no validos"});
	});
	return promise;
}

function deleteQuestion(authUser, question){
	let promise = new Promise(function(resolve, reject){
		question.remove(function(err){
			if (err) {
				reject({error: 'Cannot delete the question'});
			}
			resolve(question);
		});
	});
	return promise;
}

function validateQuestion(question){
	if(question.description == undefined || question.description == "")
		return false;
	return true;
}
