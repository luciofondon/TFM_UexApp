var templateMiddleware = require('../middlewares/TemplateMiddleware'),
    templateDAO = require('../DAOS/TemplateDAO');


module.exports = function(){

    return {
        createTemplate: function(req, res) {
            templateDAO.createTemplate(req,res);
		},
		readAllTemplate: function(req, res) {
            templateDAO.readAllTemplate(req,res);
		}
    }
}
