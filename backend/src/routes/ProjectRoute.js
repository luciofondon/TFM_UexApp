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
		.post(systemMiddleware.roOperador, projectController.create);
	  
	//CRUD proyecto
	app.route('/project/:projectId')
		.get(systemMiddleware.roOperador, projectController.read)
		.put(systemMiddleware.roOperador, projectController.update)
		.delete(systemMiddleware.roOperador, projectController.delete);

	app.route('/project/:app/:projectId')
		.post(systemMiddleware.roOperador, projectController.exportData)

	app.param('projectId', projectController.loadProject);
}
