/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var projectController = require('../controllers/ProjectController')();
	
	//CRUD proyecto
	app.route('/projects')
		.get(projectController.readAll)
		.post(projectController.create);
	  
	//CRUD proyecto
	app.route('/project/:projectId')
		.get(projectController.read)
		.put(projectController.update)
		.delete(projectController.delete);

	app.route('/project/:app/:projectId')
		.post(projectController.exportData)

	app.param('projectId', projectController.loadProject);
}