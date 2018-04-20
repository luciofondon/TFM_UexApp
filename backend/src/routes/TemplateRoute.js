/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var projectController = require('../controllers/ProjectController')(),
		templateController = require('../controllers/TemplateController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/templates/:projectId')
		.post(systemMiddleware.rolAdmin, templateController.create);

	app.route('/templates')
		.get(systemMiddleware.rolAdmin, templateController.readAll);


	app.param('projectId', projectController.loadProject);

	//CRUD proyecto
	/*app.route('/template/:templateId')
		.get(systemMiddleware.rolAdmin, templateController.read)
		.put(systemMiddleware.rolAdmin, templateController.update)
		.delete(systemMiddleware.rolAdmin, templateController.delete);

	app.param('templateId', templateController.loadTemplate);*/
};
