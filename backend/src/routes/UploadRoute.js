
module.exports = function(app){
	var multiparty = require('connect-multiparty'),
		multipartyMiddleware = multiparty();

	var uploadController = require('../controllers/UploadController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/upload/xml')
		.post(systemMiddleware.rolOperador, multipartyMiddleware, uploadController.uploadXML);

  	app.route('/upload/image')
		.post(systemMiddleware.rolOperador, multipartyMiddleware, uploadController.uploadImage);
}
