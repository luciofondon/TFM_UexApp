var aplicationMiddleware = require('../middlewares/AplicationMiddleware'),
    aplicationDAO = require('../DAOS/AplicationDAO');

module.exports = function() {

    return {

        loadAplication: function(req, res, next, aplicationId) {
            aplicationMiddleware.loadAplication(req, res, next, aplicationId);
        },

        readAplication: function(req, res) {
            res.json(req.project);
        },

        readAllAplication: function(req, res) {
            aplicationDAO.readAllAplication(req, res);
        },

        createAplication: function(req, res) {
        	  aplicationDAO.createAplication(req, res);
        },

        updateAplication: function(req, res) {
          	aplicationDAO.updateAplication(req, res);
        },

        deleteAplication: function(req, res) {
			aplicationDAO.deleteAplication(req, res);
		}

    }
}
