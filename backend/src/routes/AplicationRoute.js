
module.exports = function(app){

	var aplicationController = require('../controllers/AplicationController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/aplications')
		.get(systemMiddleware.rolOperador, aplicationController.readAllAplication)
		.post(systemMiddleware.rolOperador, aplicationController.createAplication);

	app.route('/aplication/:aplicationId')
		.get(systemMiddleware.rolOperador, aplicationController.readAplication)
		.put(systemMiddleware.rolOperador, aplicationController.updateAplication)
    	.delete(systemMiddleware.rolOperador, aplicationController.deleteAplication);

	//Generar a partir a partir de una plantilla (aplication)
	app.route('/aplication/template/:aplicationId')
		.post(systemMiddleware.rolOperador, aplicationController.generateAplication)
	
	app.param('aplicationId', aplicationController.loadAplication);

}
