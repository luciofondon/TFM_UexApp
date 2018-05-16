
module.exports = function(app){

	var aplicationController = require('../controllers/QuestionController')(),
		  systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/aplications')
		.get(systemMiddleware.rolOperador, aplicationController.createAplication);
    
	app.route('/aplication/:aplicationId')
		.get(systemMiddleware.rolOperador, aplicationController.readAplication)
		.put(systemMiddleware.rolOperador, aplicationController.updateAplication)
    .delete(systemMiddleware.rolOperador, aplicationController.deleteAplication);

	app.param('aplicationId', aplicationController.loadAplication);

}
