var templateMiddleware = require('../middlewares/TemplateMiddleware'),
    templateDAO = require('../DAOS/TemplateDAO');


module.exports = function(){

    return {
        create: function(req, res) {
            templateDAO.createTemplate(req,res);
		},
		readAll: function(req, res) {
            templateDAO.readAllTemplate(req,res);
		}
    }
}
