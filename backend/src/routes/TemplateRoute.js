
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para acceder a las plantillas
 */

module.exports = function(app){

	var templateController = require('../controllers/TemplateController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/templates/:aplicationId')
		.post(systemMiddleware.rolOperador, templateController.createTemplate)

	app.route('/template/:aplicationId')
		.delete(systemMiddleware.rolAdmin, templateController.deleteTemplate);

	app.route('/templates')
		.get(systemMiddleware.rolConsultor, templateController.readAllTemplates);

	app.route('/template/generate/:aplicationId')
		.get(systemMiddleware.rolConsultor, templateController.generateTemplateXML);

	app.param('aplicationId', templateController.loadAplication);
};
