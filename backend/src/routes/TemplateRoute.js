/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var projectController = require('../controllers/ProjectController')(),
		templateController = require('../controllers/TemplateController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/templates/:projectId')
		.post(systemMiddleware.rolOperador, templateController.createTemplate)

	app.route('/template/:projectId')
		.delete(systemMiddleware.rolAdmin, templateController.deleteTemplate);

	app.route('/templates')
		.get(systemMiddleware.rolConsultor, templateController.readAllTemplate);

	app.route('/template/generate/:projectId')
		.get(systemMiddleware.rolConsultor, templateController.generateTemplateCSV);

	app.param('projectId', projectController.loadProject);
};
