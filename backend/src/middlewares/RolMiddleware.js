var Rol = require('../models/RolModel');
  //  Rol = mongoose.model('Rol');

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