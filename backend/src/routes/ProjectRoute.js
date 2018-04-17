/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var projectController = require('../controllers/ProjectController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');
	
	//CRUD proyecto
	app.route('/projects')
		.get(systemMiddleware.rolAdmin, projectController.readAll)
		.post(systemMiddleware.rolAdmin, projectController.create);
	  
	//CRUD proyecto
	app.route('/project/:projectId')
		.get(systemMiddleware.rolAdmin, projectController.read)
		.put(systemMiddleware.rolAdmin, projectController.update)
		.delete(systemMiddleware.rolAdmin, projectController.delete);

	app.route('/project/:app/:projectId')
		.post(systemMiddleware.rolAdmin, projectController.exportData)

	app.param('projectId', projectController.loadProject);
}
