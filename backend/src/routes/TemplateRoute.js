/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var templateController = require('../controllers/TemplateController')();

	//CRUD proyecto
	app.route('/api/templates')
		.get(templateController.readAll)
		.post(templateController.create);

	//CRUD proyecto
	app.route('/api/template/:templateId')
		.get(templateController.read)
		.put(templateController.update)
		.delete(templateController.delete);

	app.param('templateId', templateController.loadTemplate);
};
