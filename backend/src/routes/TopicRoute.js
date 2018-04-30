/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){

	var topicController = require('../controllers/TopicController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

	app.route('/topics/project/:projectId')
		.post(systemMiddleware.rolOperador, topicController.createTopicByProject);

    app.route('/project/topics/:projectId')
        .get(systemMiddleware.rolOperador, topicController.readAllByProject)


	/*app.route('project/topic/:topicId')
		.get(systemMiddleware.rolAdmin, topicController.readAllByProject)
        .delete(systemMiddleware.rolAdmin, topicController.readAllByProject);*/
}
