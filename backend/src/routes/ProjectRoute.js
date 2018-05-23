/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para el objeto Project
 */

module.exports = function(app){

	var projectController = require('../controllers/ProjectController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');
	
	/**
	 * @description Rutas para leer todos los proyecto o crear un nuevo proyecto
	 */
	app.route('/projects')
		.get(systemMiddleware.rolConsultor, projectController.readAllProject)
		.post(systemMiddleware.rolOperador, projectController.createProject);
	
	/**
	 * @description Ruta para leer, actualizar o eliminar un proyecto
	 */
	app.route('/project/:projectId')
		.get(systemMiddleware.rolOperador, projectController.readProject)
		.put(systemMiddleware.rolOperador, projectController.updateProject)
		.delete(systemMiddleware.rolOperador, projectController.deleteProject);

	app.param('projectId', projectController.loadProject);
}
