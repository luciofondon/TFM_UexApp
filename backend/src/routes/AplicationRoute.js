
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para el objeto Aplication
 */

module.exports = function(app){

	var aplicationController = require('../controllers/AplicationController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');
	
	/**
	 * @description Rutas para leer todos los proyecto o crear una nueva aplicacion
	 */
	app.route('/aplications')
		.get(systemMiddleware.rolOperador, aplicationController.readAllAplication)
		.post(systemMiddleware.rolOperador, aplicationController.createAplication);

	/**
	 * @description Ruta para leer, actualizar o eliminar una aplicaion
	 */
	app.route('/aplication/:aplicationId')
		.get(systemMiddleware.rolOperador, aplicationController.readAplication)
		.put(systemMiddleware.rolOperador, aplicationController.updateAplication)
    	.delete(systemMiddleware.rolOperador, aplicationController.deleteAplication);

	/**
	 * @description Ruta para generar una aplicacion a partir de una plantilla (aplication) indicada por parametro
	 */
	app.route('/aplication/template/:aplicationId')
		.post(systemMiddleware.rolOperador, aplicationController.generateAplication);

	/**
	 * @description Ruta para generar una aplicacion a partir de una plantilla xml subida
	 */
	app.route('/aplication/xml')
		.post(systemMiddleware.rolOperador, aplicationController.generateAplicationFromXML);

	app.param('aplicationId', aplicationController.loadAplication);

}
