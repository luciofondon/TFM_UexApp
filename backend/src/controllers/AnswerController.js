var projectMiddleware = require('../middlewares/ProjectMiddleware');
    projectDAO = require('../DAOS/ProjectDAO');


module.exports = function() {

    return {

        loadAnswer: function(req, res, next, answerId) {
            //projectMiddleware.loadProject(req, res, next, projectId);
        },

        read: function(req, res) {
            res.json(req.anwer);
        },

        readAll: function(req, res) {
            //projectDAO.readAllProject(req,res);
        },

        create: function(req, res) {
           // projectDAO.createProject(req,res);
        },

        update: function(req, res) {
          //  projectDAO.updateProject(req,res);
        },

        delete: function(req, res) {
          //  return res.status(500).json({ error: "API no disponible"});
        }


    }
}
