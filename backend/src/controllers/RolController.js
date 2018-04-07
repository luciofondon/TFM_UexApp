var rolMiddleware = require('../middlewares/RolMiddleware');
    rolDAO = require('../DAOS/RolDAO');

var  Rol = require('../models/RolModel');
    Rol = mongoose.model('Rol');


module.exports = function() {

    return {

        loadRol: function(req, res, next, rolId) {
            rolMiddleware.loadRol(req, res, next, rolId);
        },  

        read: function(req, res) {
            res.json(req.project);
        },

        readAll: function(req, res) {
            rolDAO.readAllRol(req, res);
        },   

        create: function(req, res) {
            //No permitir crear nuevos roles
            return res.status(500).json({ error: "API no disponible"});
        },
    
        update: function(req, res) {
            //No permitir modificar los roles
            return res.status(500).json({ error: "API no disponible"});
        },

        delete: function(req, res) {
            //No permitir eliminar roles
            return res.status(500).json({ error: "API no disponible"});
        }

    }
}