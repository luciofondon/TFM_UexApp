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

	app.route('/project/:projectId/aplication/:aplicationId')
		.get(systemMiddleware.rolOperador, projectController.readAplicationFromProject)
		.put(systemMiddleware.rolOperador, projectController.updateAplicationFromProject)
		.delete(systemMiddleware.rolOperador, projectController.deleteAplicationFromProject);
	
	app.route('/project/aplications/:projectId')
		.post(systemMiddleware.rolOperador, projectController.createAplicationFromProject);

	app.route('/projects/aplications')
		.get(systemMiddleware.rolOperador, projectController.readAplicationsFromProjects);

	//Generar proyecto a partir de una plantilla (proyecto)
	app.route('/project/template/:projectId')
		.post(systemMiddleware.rolOperador, projectController.generateProject)

	/*app.route('/project/:app/:projectId')
		.post(systemMiddleware.rolOperador, projectController.exportData)*/

	app.param('projectId', projectController.loadProject);
}
