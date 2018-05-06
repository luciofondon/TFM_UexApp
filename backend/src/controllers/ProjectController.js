var projectMiddleware = require('../middlewares/ProjectMiddleware');
    projectDAO = require('../DAOS/ProjectDAO');


module.exports = function() {

    return {

        loadProject: function(req, res, next, projectId) {
            projectMiddleware.loadProject(req, res, next, projectId);
        },

        readProject: function(req, res) {
            res.json(req.project);
        },

        readAllProject: function(req, res) {
            projectDAO.readAllProject(req,res);
        },

        createProject: function(req, res) {
            projectDAO.createProject(req,res);
        },

        updateProject: function(req, res) {
            projectDAO.updateProject(req,res);
        },

        deleteProject: function(req, res) {
        	projectDAO.deleteProject(req,res);
        },

        exportData: function(req, res) {
            projectDAO.exportData(req,res);
		},

		generateProject: function(req, res){
            projectDAO.generateProject(req,res);
		},

		readAppProject: function(req, res) {
            projectDAO.readAppProject(req,res);
        },

        createAppProject: function(req, res) {
            projectDAO.createAppProject(req,res);
        },

        updateAppProject: function(req, res) {
            projectDAO.updateProject(req,res);
        },

        deleteAppProject: function(req, res) {
        	projectDAO.deleteAppProject(req,res);
        }

    }
}
