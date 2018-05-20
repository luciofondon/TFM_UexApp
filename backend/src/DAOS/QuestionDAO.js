/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash');

var Question = require('../models/QuestionModel');
    Question = mongoose.model('Question');

exports.deleteQuestionAsociate = function(req, res) {
    deleteQuestionAsociate(req, res);
};

exports.updateQuestionAsociate = function(req, res) {
    updateQuestionAsociate(req, res);
};

exports.createQuestionAsociate = function(req, res) {
    createQuestionAsociate(req, res);
};

exports.readQuestionAsociate = function(req, res) {
    readQuestionAsociate(req, res);
};

exports.createAnswerAsociate = function(req, res) {
    createAnswerAsociate(req, res);
};


function createAnswerAsociate(req, res){
	let question = req.question;
	question.answers.forEach(function(answer){
		if(answer._id.toString() == req.params.answerId.toString()){
			answer.question.answers.forEach(funciton(an))
			answer.questions.push(questionAsociate._id);
		}
	});

}

function deleteQuestionAsociate(req, res){
}

function createQuestionAsociate(req, res){
	var question = req.question;
	let questionAsociate = new Question(req.body);
	question.answers.forEach(function(answer){
		if(answer._id.toString() == req.params.answerId.toString()){
			console.log("Igual")
			answer.questions.push(questionAsociate._id);
		}
	});

	questionAsociate.save(function(err) {
		if (err) {
			return res.status(500).json({error: 'Cannot update the question'});
		}
		question.save(function(err) {

			if (err) {
				return res.status(500).json({error: 'Cannot update the question'});
			}
			res.json(question);
		});
	});
}

function updateQuestionAsociate(req, res){
}

function readQuestionAsociate(req, res){
}

function validateQuestion(topic){
    return true;
}
