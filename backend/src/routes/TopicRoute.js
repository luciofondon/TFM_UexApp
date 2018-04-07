/*
* @author luciofondon
* @date 2017
*/

module.exports = function(app){
	
	var topicController = require('../controllers/TopicController')();
	
    app.route('/api/topics/project/:projectId')
        .get(topicController.readAllByProject)
		.post(topicController.createByProject);
        
}