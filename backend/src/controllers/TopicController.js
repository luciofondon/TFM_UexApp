var topicDAO = require('../DAOS/TopicDAO');


module.exports = function() {

    return {
        readAllByProject: function(req, res) {
            topicDAO.readAllByProject(req,res);
        },

        createByProject: function(req, res) {
            topicDAO.createByProject(req,res);
        }

    }
}
