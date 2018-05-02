var topicDAO = require('../DAOS/TopicDAO');


module.exports = function() {

    return {
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
