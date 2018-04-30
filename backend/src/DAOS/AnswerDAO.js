/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash');

var Question = require('../models/QuestionModel');
    Question = mongoose.model('Question');

exports.createAnswer = function(req, res) {
    createAnswer(req, res);
};

exports.updateAnswer = function(req, res) {
    updateAnswer(req, res);
};

exports.deleteAnswer = function(req, res) {
    deleteAnswer(req, res);
};

exports.readAnswer = function(req, res) {
    readAnswer(req, res);
}

function deleteAnswer(req, res){

	let question = req.question;
	for(let i = 0; i < question.answers.length; i++){
		if(question.answers[i]._id.toString() == req.params.answerId.toString()){
			question.answers.splice(i, 1);
		}
	}
	question.save(function(err) {
		if (err) {
			return res.status(500).json({error: 'Cannot delete the question'});
		}
		return res.json(question);
	});
}

function updateAnswer(req, res){
	let question = req.question;
	let answer = req.body;
	if(validateAnswer(answer)){
		for(let i = 0; i < question.answers.length; i++){
			if(question.answers[i]._id.toString() == req.params.answerId.toString()){
				question.answers[i] = answer;
			}
		}
		question.save(function(err) {
			if (err) {
				return res.status(500).json({error: 'Cannot delete the question'});
			}
			return res.json(question);
		});
	}else
		return res.status(500).json({error: "Parametros de la API no validos"});
}

function readAnswer(req, res){
	let question = req.question;
	for(let i = 0; i < question.answers.length; i++){
		if(question.answers[i]._id.toString() == req.params.answerId.toString()){
			return res.json(question.answers[i]);
		}
	}
	return res.status(500).json({error: "Parametros de la API no validos"});
}

function createAnswer(req, res){
	let question = req.question;
	let answer = req.body;
    if(validateAnswer(answer)){
		question.answers.push(answer);
        question.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot save the question'});
            }
            res.json(question);
        });
    }else
        return res.status(500).json({error: "Parametros de la API no validos"});
}

function validateAnswer(answer){
    return true;
}
