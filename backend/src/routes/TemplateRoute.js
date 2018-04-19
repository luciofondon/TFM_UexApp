/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var templateController = require('../controllers/TemplateController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD proyecto
	app.route('/templates')
		.get(systemMiddleware.rolAdmin, templateController.readAll)
		.post(systemMiddleware.rolAdmin, templateController.create);

	//CRUD proyecto
	app.route('/template/:templateId')
		.get(systemMiddleware.rolAdmin, templateController.read)
		.put(systemMiddleware.rolAdmin, templateController.update)
		.delete(systemMiddleware.rolAdmin, templateController.delete);

	app.param('templateId', templateController.loadTemplate);
};
