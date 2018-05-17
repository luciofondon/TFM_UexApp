var questionMiddleware = require('../middlewares/QuestionMiddleware');
    answerDAO = require('../DAOS/AnswerDAO');


module.exports = function() {

    return {

        loadQuestion: function(req, res, next, questionId) {
            questionMiddleware.loadQuestion(req, res, next, questionId);
        },

        readAnswer: function(req, res) {
			answerDAO.readAnswer(req, res);
        },

        createAnswer: function(req, res) {
        	answerDAO.createAnswer(req, res);
        },

        updateAnswer: function(req, res) {
          	answerDAO.updateAnswer(req, res);
        },

        deleteAnswer: function(req, res) {
			answerDAO.deleteAnswer(req, res);
		}

    }
}
