/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var projectController = require('../controllers/ProjectController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	//CRUD proyecto
	app.route('/projects')
		.get(systemMiddleware.rolConsultor, projectController.readAllProject)
		.post(systemMiddleware.rolOperador, projectController.createProject);

	//CRUD proyecto
	app.route('/project/:projectId')
		.get(systemMiddleware.rolOperador, projectController.readProject)
		.put(systemMiddleware.rolOperador, projectController.updateProject)
		.delete(systemMiddleware.rolOperador, projectController.deleteProject);

	app.route('/project/app/:projectId')
		.get(systemMiddleware.rolOperador, projectController.readAppProject)
		.put(systemMiddleware.rolOperador, projectController.updateAppProject)
		.delete(systemMiddleware.rolOperador, projectController.deleteAppProject)
		.post(systemMiddleware.rolOperador, projectController.createAppProject);


	//Generar proyecto a partir de una plantilla (proyecto)
	app.route('/project/template/:projectId')
		.post(systemMiddleware.rolOperador, projectController.generateProject)

	app.route('/project/:app/:projectId')
		.post(systemMiddleware.rolOperador, projectController.exportData)

	app.param('projectId', projectController.loadProject);
}
