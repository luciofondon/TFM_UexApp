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

	app.param('projectId', projectController.loadProject);
}
