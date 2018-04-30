/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var projectController = require('../controllers/ProjectController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');
	
	//CRUD proyecto
	app.route('/projects')
		.get(systemMiddleware.rolConsultor, projectController.readAll)
		.post(systemMiddleware.rolOperador, projectController.create);
	  
	//CRUD proyecto
	app.route('/project/:projectId')
		.get(systemMiddleware.rolOperador, projectController.read)
		.put(systemMiddleware.rolOperador, projectController.update)
		.delete(systemMiddleware.rolOperador, projectController.delete);

	app.route('/project/:app/:projectId')
		.post(systemMiddleware.rolOperador, projectController.exportData)

	app.param('projectId', projectController.loadProject);
}
