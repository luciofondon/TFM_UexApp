var _ = require('lodash');

var userMiddleware = require('../middlewares/UserMiddleware'),
    userDAO = require('../DAOS/UserDAO');
	userRepository = require('../repositories/userRepository');

module.exports = function() {

    return {
        loadUser: function(req, res, next, userId){
            userMiddleware.loadUser(req, res, next, userId);
        },

        readUser: function(req, res){
            res.json(req.user);
        },

        readAllUser: function(req, res){
			userRepository.readAllUser(req.authUser).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        createUser: function(req, res){
            userDAO.createUser(req, res);
        },

        updateUser: function(req, res){
			userRepository.updateUser(req.authUser, _.extend(req.user, req.body)).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        deleteUser: function(req, res){
			userRepository.deleteUser(req.authUser, req.user).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

        resetPasswordUser: function(req, res){
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


