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

module.exports = {
	readAllByAplication: function(req, res) {
		readAllByAplication(req, res);
	}

}


function readAllByAplication(req, res){
    Topic.find({aplication: req.params.aplicationId}).sort({name:1}).exec(function(err, topics) {
        if (err) {
            return res.status(500).json({ error: 'Cannot list all the topics' });
		}
		Question.find({ topic: { $ne: null } }).populate("answers.questions").exec(function(err, questions) {
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
/*
function createTopicByAplication(req, res){
    let topic = new Topic(req.body);
    topic.aplication = req.params.aplicationId; 
    if(validateTopic(topic)){
        topic.save(function(err) {
            if (err) {
                return res.status(501).json({error: 'Cannot save the topic'});
            }
            res.json(topic);
        });
    }else
        return res.status(500).json({ error: "Parametros de la API no validos"});
}*/

function validateTopic(topic){
    return true;
}
