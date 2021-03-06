var _ = require('lodash'),
	mongoose = require('mongoose');

var User = require('../models/UserModel'),
	User = mongoose.model('User');

var userMiddleware = require('../middlewares/UserMiddleware'),
	userRepository = require('../repositories/UserRepository');

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
            userRepository.createUser(req.authUser, new User(req.body), req.body.password).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
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
            userRepository.deleteUser(req.authUser, req.user,  req.body.password).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        login: function(req, res) {
			userRepository.loginUser(req.body.email, req.body.password).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		},

		signup: function(req, res) {
			userRepository.signupUser(new User(req.body), req.body.password).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
        },

        me: function(req, res){
            res.json(req.authUser);
		},

		updateMeUser: function(req, res) {
            userRepository.updateMeUser(req.authUser, req.body).then(function(data){
				return res.status(200).json(data);
			}).catch(function(err){
				return res.status(500).json(err);
			});
		}

    }
}


