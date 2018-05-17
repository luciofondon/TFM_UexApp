var questionDAO = require('../DAOS/QuestionDAO'),
    questionMiddleware = require('../middlewares/QuestionMiddleware');

module.exports = function() {

    return {
        readAllByTopic: function(req, res) {
            questionDAO.readAllByTopic(req,res);
        },

        createByTopic: function(req, res) {
            questionDAO.createByTopic(req,res);
        },
		
        loadQuestion: function(req, res, next, projectId) {
            questionMiddleware.loadQuestion(req, res, next, projectId);
        },

        readQuestion: function(req, res) {
            res.json(req.question);
        },

        updateQuestion: function(req, res) {
            questionDAO.updateQuestion(req, res);
        },

        deleteQuestion: function(req, res) {
            questionDAO.deleteQuestion(req, res);
        },
		
		createQuestionAsociate: function(req, res) {
            questionDAO.createQuestionAsociate(req, res);
        },
		
		deleteQuestionAsociate: function(req, res) {
            questionDAO.deleteQuestionAsociate(req, res);
        },
		
	 	updateQuestionAsociate: function(req, res) {
            questionDAO.updateQuestionAsociate(req, res);
        },
		
	 	readQuestionAsociate: function(req, res) {
            questionDAO.readQuestionAsociate(req, res);
        }
    }
}
