var Question = require('../models/QuestionModel');
    Question = mongoose.model('Question');


exports.loadQuestion = function(req, res, next, questionId) {
    loadQuestion(req, res, next, questionId);
}


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