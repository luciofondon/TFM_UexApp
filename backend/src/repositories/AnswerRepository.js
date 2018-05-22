
var Promise = require('promise');

var Question = require('../models/QuestionModel');

module.exports = {
	readAnswer: function(authUser, question, answerId) {
		return readAnswer(authUser, question, answerId);
	},

	createAnswer: function(authUser, question, answerId) {
		return createAnswer(authUser, question, answerId);
	},

	updateAnswer: function(authUser, question, answerId) {
		return updateAnswer(authUser, question, answerId);
	},

	deleteAnswer: function(authUser, question, answerId) {
		return deleteAnswer(authUser, question, answerId);
	}
}

function readAnswer(authUser, question, answerId){
	let promise = new Promise(function(resolve, reject){
		let answer;
		for(let i = 0; i < question.answers.length; i++){
			if(question.answers[i]._id.toString() == answerId.toString()){
				answer= question.answers[i]
			}
		}
		if(answer){
			resolve(answer);
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function createAnswer(authUser, question, answer){
	let promise = new Promise(function(resolve, reject){
		if(validateAnswer(answer)){
			question.answers.push(answer);
			question.save(function(err) {
				if (err) {
					reject({error: 'Cannot save the question'});
				}
				resolve(question);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function updateAnswer(authUser, question, answer){
	let promise = new Promise(function(resolve, reject){
		if(validateAnswer(answer)){
			for(let i = 0; i < question.answers.length; i++){
				if(question.answers[i]._id.toString() == answer._id.toString()){
					question.answers[i] = answer;
				}
			}
			question.save(function(err) {
				if (err) {
					reject({error: 'Cannot delete the question'});
				}
				resolve(question);
			});
		}else{
			reject({error: "Parametros de la API no validos"});
		}
	});
	return promise;
}

function deleteAnswer(authUser, question, answerId){
	let promise = new Promise(function(resolve, reject){
		for(let i = 0; i < question.answers.length; i++){
			if(question.answers[i]._id.toString() == answerId.toString()){
				question.answers.splice(i, 1);
			}
		}
		question.save(function(err) {
			if (err) {
				reject({error: 'Cannot delete the question'});
			}
			resolve(question);
		});
	});
	return promise;
}


function validateAnswer(answer){
<<<<<<< HEAD
	if(answer.description == undefined || answer.description == "")
		return false;
	else if(answer.requirement == undefined || answer.requirement == "")
		return false;
=======
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
	return true;
}
