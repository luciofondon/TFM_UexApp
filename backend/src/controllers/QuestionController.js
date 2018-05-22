

var _ = require('lodash');

var Question = require('../models/QuestionModel');

var questionMiddleware = require('../middlewares/QuestionMiddleware'),
	questionRepository = require('../repositories/QuestionRepository');


module.exports = function() {

    return {

        loadQuestion: function(req, res, next, projectId) {
            questionMiddleware.loadQuestion(req, res, next, projectId);
		},

        readAllByTopic: function(req, res) {
			questionRepository.readAllByTopic(req.authUser, req.params.topicId).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

        createByTopic: function(req, res) {
			questionRepository.createByTopic(req.authUser, new Question(req.body), req.params.topicId).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        readQuestion: function(req, res) {
            res.json(req.question);
        },

        updateQuestion: function(req, res) {
			questionRepository.updateQuestion(req.authUser, _.extend(req.question, req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        deleteQuestion: function(req, res) {
			questionRepository.updateQuestion(req.authUser, req.question).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

		createQuestionAsociate: function(req, res) {
			questionRepository.createQuestionAsociate(req.authUser, req.question, new Question(req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});        
		},

		/*deleteQuestionAsociate: function(req, res) {
            questionDAO.deleteQuestionAsociate(req, res);
        },

	 	updateQuestionAsociate: function(req, res) {
            questionDAO.updateQuestionAsociate(req, res);
        },

	 	readQuestionAsociate: function(req, res) {
            questionDAO.readQuestionAsociate(req, res);
		},

		createAnswerAsociate: function(req, res) {
            questionDAO.createAnswerAsociate(req, res);
		}*/
    }
}
