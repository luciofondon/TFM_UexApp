

var _ = require('lodash');

var Project = require('../models/ProjectModel');

var projectMiddleware = require('../middlewares/ProjectMiddleware'),
	projectRepository = require('../repositories/ProjectRepository');

module.exports = function() {

    return {

        loadProject: function(req, res, next, projectId) {
            projectMiddleware.loadProject(req, res, next, projectId);
        },

        readProject: function(req, res) {
            res.json(req.project);
        },

        readAllProject: function(req, res) {
			projectRepository.readAllProject(req.authUser).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        createProject: function(req, res) {
			projectRepository.createProject(req.authUser, new Project(req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        updateProject: function(req, res) {
			projectRepository.createProject(req.authUser, _.extend(req.project, req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

        deleteProject: function(req, res) {
			projectRepository.deleteProject(req.authUser, req.project).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		}

    }
}
