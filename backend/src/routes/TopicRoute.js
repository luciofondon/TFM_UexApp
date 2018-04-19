/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var topicController = require('../controllers/TopicController')(),
		systemMiddleware = require('../middlewares/SystemMiddleware');

    app.route('/topics/project/:projectId')
        .get(systemMiddleware.rolAdmin, topicController.readAllByProject)
		.post(systemMiddleware.rolAdmin, topicController.createByProject);
        
}
