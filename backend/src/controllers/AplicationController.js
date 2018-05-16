var aplicationMiddleware = require('../middlewares/QuestionMiddleware');
    aplicationDAO = require('../DAOS/AplicationDAO');

module.exports = function() {

    return {

        loadAplication: function(req, res, next, questionId) {
            aplicationMiddleware.loadQuestion(req, res, next, questionId);
        },

        readAplication: function(req, res) {
			      aplicationDAO.readAplication(req, res);
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
