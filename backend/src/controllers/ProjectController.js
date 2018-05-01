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
            //No permitir esta opcion porque los municipios pertenencen al proyecto
            return res.status(500).json({ error: "API no disponible"});
        },

        exportData: function(req, res) {
            projectDAO.exportData(req,res);
		},

		generateProject: function(req, res){
            projectDAO.generateProject(req,res);
		}

    }
}
