var topicDAO = require('../DAOS/TopicDAO');


module.exports = function() {

    return {
        readAllByProject: function(req, res) {
            topicDAO.readAllByProject(req,res);
        },

        createTopicByProject: function(req, res) {
            topicDAO.createTopicByProject(req, res);
        }

    }
}
