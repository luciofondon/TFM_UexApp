module.exports = function(app){

	var uploadController = require('../controllers/ProjectController')(),
		  systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/upload/xml')
		.post(systemMiddleware.rolOperador, uploadController.uploadCSV);
 
  app.route('/upload/image')
		.post(systemMiddleware.rolOperador, uploadController.uploadImage);
}
