
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Middleware de Rol
 */

var Rol = require('../models/RolModel');

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} topicId
 * @description Middleware que carga el identificador pasado por parametro en la url
 */
exports.loadRol = function(req, res, next, rolId) {
    loadRol(req, res, next, rolId);
};

function loadRol(req, res, next, rolId) {
    Rol.load(rolId, function(err, rol) {
        if (err) 
            return res.status(500).json({error: 'El identificador no es valido'});
        if (rol == undefined) 
            return res.status(500).json({error: 'El identificador no existe'});
        req.rol = rol;
        next();
    });
}