/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash');

var Question = require('../models/QuestionModel');
    Question = mongoose.model('Question');

exports.readAllByTopic = function(req, res) {
    readAllByTopic(req, res);
}

exports.createByTopic = function(req, res) {
    createByTopic(req, res);
}


exports.updateQuestion = function(req, res) {
    updateQuestion(req, res);
};

exports.deleteQuestion = function(req, res) {
    deleteQuestion(req, res);
};

function deleteQuestion(req, res){
	var question = req.question;
    question.remove(function(err) {
        if (err) {
            return res.status(500).json({error: 'Cannot delete the question'});
        }
        res.json(question);
    });
}

function updateQuestion(req, res){
    let question = _.extend(req.question, req.body);
    if(validateQuestion(question)){
        question.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot update the question'});
            }
            res.json(question);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}

function readAllByTopic(req, res){
    Question.find({topic: req.params.topicId}).sort({name:1}).exec(function(err, questions) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the topics' });
        }
        res.json(questions);
    });
}

function createByTopic(req, res){
    let question = new Question(req.body);
    question.topic = req.params.topicId; 
    if(validateQuestion(question)){
        question.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot save the question'});
            }
            res.json(question);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}



function validateQuestion(topic){
    return true;
}
