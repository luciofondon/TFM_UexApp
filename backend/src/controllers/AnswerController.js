

var _ = require('lodash');

var questionMiddleware = require('../middlewares/QuestionMiddleware'),
    answerRepository= require('../repositories/AnswerRepository');


module.exports = function() {

    return {

        loadQuestion: function(req, res, next, questionId) {
            questionMiddleware.loadQuestion(req, res, next, questionId);
        },

        readAnswer: function(req, res) {
			answerRepository.readAnswer(req.authUser, req.question, req.params.answerId).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        createAnswer: function(req, res) {
        	answerRepository.createAnswer(req.authUser, req.question, req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        updateAnswer: function(req, res) {
			answerRepository.updateAnswer(req.authUser, req.question, req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

        deleteAnswer: function(req, res) {
			answerRepository.deleteAnswer(req.authUser, req.question, req.params.answerId).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		}

    }
}
