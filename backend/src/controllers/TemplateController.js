var templateDAO = require('../DAOS/TemplateDAO');

module.exports = function(){

    return {
        createTemplate: function(req, res) {
            templateDAO.createTemplate(req,res);
		},
		readAllTemplate: function(req, res) {
            templateDAO.readAllTemplate(req,res);
		},
		deleteTemplate: function(req, res) {
            templateDAO.deleteTemplate(req,res);
		},
		downloadTemplate: function(req, res){
			templateDAO.downloadTemplate(req,res);
		}
    }
}
