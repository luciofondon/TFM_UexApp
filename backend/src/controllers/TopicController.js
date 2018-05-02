var topicMiddleware = require('../middlewares/TopicMiddleware'),
	topicDAO = require('../DAOS/TopicDAO');


module.exports = function() {

    return {
		loadTopic: function(req, res, next, topicId) {
            topicMiddleware.loadTopic(req, res, next, topicId);
        },
		
        readAllByProject: function(req, res) {
            topicDAO.readAllByProject(req,res);
        },

        createTopicByProject: function(req, res) {
            topicDAO.createTopicByProject(req, res);
        },
		
        deleteTopic: function(req, res) {
            topicDAO.deleteTopic(req, res);
        },
		
        updateTopic: function(req, res) {
            topicDAO.updateTopic(req, res);
        }

    }
}
