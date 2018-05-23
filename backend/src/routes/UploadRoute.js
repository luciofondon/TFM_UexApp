
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para subir ficheros al servidor
 */

module.exports = function(app){
	var multiparty = require('connect-multiparty'),
		multipartyMiddleware = multiparty();

	var uploadController = require('../controllers/UploadController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');
	
	/**
	 * @description Ruta parasubir un fichero xml
	 */
	app.route('/upload/xml')
		.post(systemMiddleware.rolOperador, multipartyMiddleware, uploadController.uploadXML);
	
	/**
	 * @description Ruta parasubir una imagen
	 */
  	app.route('/upload/image')
		.post(systemMiddleware.rolOperador, multipartyMiddleware, uploadController.uploadImage);
}
