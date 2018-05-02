var mediatoryDAO = require('../DAOS/MediatoryDAO');

module.exports = function() {

    return {

        getProjects: function(req, res) {
            mediatoryDAO.getApps(req,res);
        },

        getApps: function(req, res) {
            mediatoryDAO.getApps(req,res);
        },

        checkComunication: function(req, res) {
            mediatoryDAO.checkComunication(req,res);
        }
    }
}
