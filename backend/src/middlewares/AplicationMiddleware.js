
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Middleware de Aplication
 */

var Aplication = require('../models/AplicationModel');

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} topicId
 * @description Middleware que carga el identificador pasado por parametro en la url
 */
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
