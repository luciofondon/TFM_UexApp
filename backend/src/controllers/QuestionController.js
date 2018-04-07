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

        read: function(req, res) {
            res.json(req.question);
        },

        update: function(req, res) {
            questionDAO.update(req,res);
        },

        delete: function(req, res) {
            return res.status(500).json({ error: "API no disponible"});
        }
    }
}