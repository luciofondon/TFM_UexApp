var projectMiddleware = require('../middlewares/ProjectMiddleware');
    projectDAO = require('../DAOS/ProjectDAO');


module.exports = function() {

    return {

        loadProject: function(req, res, next, projectId) {
            projectMiddleware.loadProject(req, res, next, projectId);
        },

        read: function(req, res) {
            res.json(req.project);
        },

        readAll: function(req, res) {
            console.log("entra")
            projectDAO.readAllProject(req,res);
        },

        create: function(req, res) {
            console.log(req.body)
            projectDAO.createProject(req,res);
        },

        update: function(req, res) {
            projectDAO.updateProject(req,res);
        },

        delete: function(req, res) {
            //No permitir esta opcion porque los municipios pertenencen al proyecto
            return res.status(500).json({ error: "API no disponible"});
        },

        exportData: function(req, res) {
            projectDAO.exportData(req,res);
        }


    }
}
