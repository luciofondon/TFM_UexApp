var Aplication = require('../models/QuestionModel');
    Aplication = mongoose.model('Question');


exports.loadAplication = function(req, res, next, aplicationId) {
    loadAplication(req, res, next, aplicationId);
};

function loadAplication(req, res, next, aplicationId) {
    Aplication.load(aplicationId, function(err, aplication) {
        if (err) 
            return res.status(500).json({error: 'El identificador no es valido'});
        if (aplication == undefined) 
            return res.status(500).json({error: 'El identificador no existe'});
        req.aplication = aplication;
        next();
    });
}
