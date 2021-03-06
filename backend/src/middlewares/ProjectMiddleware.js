
/**
 * @author Lucio David Fondon Terron - 2018
 * @description Middleware de Project
 */

var Project = require('../models/ProjectModel');

exports.loadProject = function(req, res, next, projectId) {
    loadProject(req, res, next, projectId);
};

function loadProject(req, res, next, projectId) {
    // Comprobar que el usuario registrado tiene acceso al proyecto
    Project.load(projectId, function(err, project) {
        if (err) 
            return res.status(500).json({error: 'El identificador no es valido'});
        if (project == undefined) 
            return res.status(500).json({error: 'El identificador no existe'});
        req.project = project;
        next();
    });
}