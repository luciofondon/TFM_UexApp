
var templateRepository = require('../repositories/TemplateRepository'),
	aplicationMiddleware = require('../middlewares/AplicationMiddleware');


module.exports = function(){

    return {

		loadAplication: function(req, res, next, aplicationId) {
            aplicationMiddleware.loadAplication(req, res, next, aplicationId);
		},

        createTemplate: function(req, res) {
			console.log(req.aplication)
			templateRepository.createTemplate(req.authUser, req.body, req.aplication).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

		readAllTemplates: function(req, res) {
			templateRepository.readAllTemplates(req.authUser).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

		deleteTemplate: function(req, res) {
			templateRepository.deleteTemplate(req.authUser, req.aplication).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

		generateTemplateXML: function(req, res){
			templateRepository.generateTemplateXML(req.authUser, req.aplication).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		}
    }
}
