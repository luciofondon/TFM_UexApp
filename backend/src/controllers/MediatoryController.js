
var mediatoryDAO = require('../DAOS/MediatoryDAO');


module.exports = function() {

    return {

        getProjects: function(req, res) {
            mediatoryDAO.getProjects(req,res);
        },

        getApps: function(req, res) {
            mediatoryDAO.getApps(req,res);
        },

        checkComunication: function(req, res) {
            mediatoryDAO.checkComunication(req,res);
		},

		createProject: function(req, res) {
            mediatoryDAO.createProject(req,res);
		},

		readAllIssues: function(req, res){
            mediatoryDAO.readAllIssues(req,res);
		},

		createIssues: function(req, res){
            mediatoryDAO.createIssues(req,res);
		}

    }
}
