
<<<<<<< HEAD
var mediatoryDAO = require('../DAOS/MediatoryDAO'),
    mediatoryService = require('../services/MediatoryService');
=======
var mediatoryService = require('../services/MediatoryService');
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5

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
<<<<<<< HEAD
            });		
=======
            });
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
        },

		createProject: function(req, res) {
            mediatoryService.createProject(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
<<<<<<< HEAD
            });		
=======
            });
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
        },

		readAllIssues: function(req, res){
            mediatoryService.readAllIssues(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
<<<<<<< HEAD
            });		
=======
            });
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
        },

		createIssues: function(req, res){
            mediatoryService.createIssues(req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
<<<<<<< HEAD
            });		
=======
            });
>>>>>>> effc82b2ade007cd6c4ef069e7cb91e507db9ab5
        }

    }
}
