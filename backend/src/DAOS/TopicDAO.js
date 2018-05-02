/*
* @author luciofondon
* @date 2018
*/

var mongoose = require('mongoose'),
    _ = require('lodash');

var Topic = require('../models/TopicModel');
	Topic = mongoose.model('Topic');


var Question = require('../models/QuestionModel');
	Question = mongoose.model('Question');

exports.readAllByProject = function(req, res) {
    readAllByProject(req, res);
}

exports.createTopicByProject = function(req, res) {
    createTopicByProject(req, res);
}

exports.deleteTopic = function(req, res) {
    deleteTopic(req, res);
}

exports.updateTopic = function(req, res) {
    updateTopic(req, res);
}

function deleteTopic(req, res){
	let topic = req.topic;
	
	//Eliminar preguntas asociadas al topic
	Question.remove({topic: topic._id}, function(err){
		topic.remove(function(err){
			return res.json({info: 'Delete topic ok'});
		});
	});
}

function updateTopic(req, res){
 	let topic = _.extend(req.topic, req.body);
    if(validateTopic(topic)){
        topic.save(function(err) {
            if (err) {
                return res.status(500).json({error: 'Cannot update the topic'});
            }

            res.json(topic);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}

function readAllByProject(req, res){
    Topic.find({project: req.params.projectId}).sort({name:1}).exec(function(err, topics) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the topics' });
		}
		Question.find({}).exec(function(err, questions) {
			let topicsFormat = [];
			topics.forEach(function(topic){
				let topicFormat = JSON.parse(JSON.stringify(topic));
				topicFormat.questions = [];

				for(let i = 0; i < questions.length; i++){
					if(questions[i].topic.toString() == topic._id.toString()){
						topicFormat.questions.push(questions[i]);
					}
				}
				topicsFormat.push(topicFormat);
			});
			res.json(topicsFormat);
		});
    });
}

function createTopicByProject(req, res){
    let topic = new Topic(req.body);
    topic.project = req.params.projectId; 
    if(validateTopic(topic)){
        topic.save(function(err) {
            if (err) {
                return res.status(501).json({error: 'Cannot save the topic'});
            }
            res.json(topic);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}

function validateTopic(topic){
    return true;
}
