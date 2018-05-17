var userMiddleware = require('../middlewares/UserMiddleware'),
    userDAO = require('../DAOS/UserDAO');

module.exports = function() {

    return {
        loadUser: function(req, res, next, userId){
            userMiddleware.loadUser(req, res, next, userId);
        },

        read: function(req, res){
            res.json(req.user);
        },

        readAll: function(req, res){
            userDAO.readAllUser(req, res);
        },

        create: function(req, res){
            userDAO.createUser(req, res);
        },

        update: function(req, res){
            userDAO.updateUser(req, res);
        },

        delete: function(req, res){
            userDAO.deleteUser(req, res);
        },

        resetPassword: function(req, res){
            userDAO.resetPasswordUser(req, res);
        },

        login: function(req, res) {
            userDAO.loginUser(req, res);
        },

		signup: function(req, res) {
            userDAO.signupUser(req, res);
        },

        me: function(req, res){
            res.json(req.authUser);
		},

		updateMeUser: function(req, res) {
            userDAO.updateMeUser(req, res);
		},

		uploadImageUser: function(req, res){
			userDAO.uploadImageUser(req, res);
		}
    }
}


