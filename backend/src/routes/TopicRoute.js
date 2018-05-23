
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Rutas disponibles para el objeto Topic
 */

module.exports = function(app){

	var topicController = require('../controllers/TopicController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/topics/aplication/:aplicationId')
		.post(systemMiddleware.rolOperador, topicController.createTopicByAplication)
        .get(systemMiddleware.rolOperador, topicController.readAllByAplication);

	app.route('/topic/:topicId')
		.put(systemMiddleware.rolOperador, topicController.updateTopic)
		.get(systemMiddleware.rolOperador, topicController.readTopic)
        .delete(systemMiddleware.rolOperador, topicController.deleteTopic);

	app.param('topicId', topicController.loadTopic);

}
