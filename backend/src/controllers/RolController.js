var rolMiddleware = require('../middlewares/RolMiddleware'),
	rolRepository = require('../repositories/RolRepository');

module.exports = function() {

    return {

        loadRol: function(req, res, next, rolId) {
            rolMiddleware.loadRol(req, res, next, rolId);
        },

        readRol: function(req, res) {
     		//No permitir crear nuevos roles
			return res.status(500).json({ error: "API no disponible"});
	    },

        readAllRol: function(req, res) {
			rolRepository.readAllRol(req.authUser).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        createRol: function(req, res) {
            //No permitir crear nuevos roles
            return res.status(500).json({ error: "API no disponible"});
        },

        updateRol: function(req, res) {
            //No permitir modificar los roles
            return res.status(500).json({ error: "API no disponible"});
        },

        deleteRol: function(req, res) {
            //No permitir eliminar roles
            return res.status(500).json({ error: "API no disponible"});
        }

    }
}
