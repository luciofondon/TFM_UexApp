
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Middleware de Question
 */

var Question = require('../models/QuestionModel');

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} topicId
 * @description Middleware que carga el identificador pasado por parametro en la url
 */
exports.loadQuestion = function(req, res, next, questionId) {
    loadQuestion(req, res, next, questionId);
};

function loadQuestion(req, res, next, questionId) {
    Question.load(questionId, function(err, question) {
        if (err) 
            return res.status(500).json({error: 'El identificador no es valido'});
        if (question == undefined) 
            return res.status(500).json({error: 'El identificador no existe'});
        req.question = question;
        next();
    });
}