
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Middleware de User
 */

var User = require('../models/UserModel');

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {} topicId
 * @description Middleware que carga el identificador pasado por parametro en la url
 */
exports.loadUser = function(req, res, next, userId) {
    loadUser(req, res, next, userId);
};

function loadUser(req, res, next, userId) {
    // Comprobar que el usuario registrado tiene acceso para consultar el usuario
    User.load(userId, function(err, user) { 
        if (err) 
            return res.status(500).json({error: 'El identificador no es valido'});
        if (user == undefined) 
            return res.status(500).json({error: 'El identificador no existe'});
        req.user = user;
        next();
    });
}