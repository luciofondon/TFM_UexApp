/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var topicController = require('../controllers/TopicController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/topics/project/:projectId')
		.post(systemMiddleware.rolOperador, topicController.createTopicByProject)
        .get(systemMiddleware.rolOperador, topicController.readAllByProject);

	app.route('/topic/:topicId')
		.put(systemMiddleware.rolOperador, topicController.updateTopic)
		.get(systemMiddleware.rolOperador, topicController.getTopic)
        .delete(systemMiddleware.rolOperador, topicController.deleteTopic);

	app.param('topicId', topicController.loadTopic);

}
