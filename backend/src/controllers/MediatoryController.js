

var mediatoryService = require('../services/MediatoryService');

module.exports = function() {

    return {

        getProjects: function(req, res) {
            mediatoryService.getProjects(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        getApps: function(req, res) {
            mediatoryService.getApps(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        checkComunication: function(req, res) {
            mediatoryService.checkComunication(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
            });
        },

		createProject: function(req, res) {
            mediatoryService.createProject(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
            });
        },

		readAllIssues: function(req, res){
            mediatoryService.readAllIssues(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
            });

        },

		createIssues: function(req, res){
            mediatoryService.createIssues(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
            });
        }

    }
}
