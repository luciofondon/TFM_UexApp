

var Project = require('../models/ProjectModel');
var mongoose = require('mongoose');

var User = require('../models/UserModel'),
	User = mongoose.model('User');

module.exports = function() {

    return {

        dataDashboard: function(req, res) {
            let response = {};
            User.find({}).count().then(function(userCount){
                response.users = userCount;
                return Project.find({}).count();
            }).then(function(projectCount){
                response.projects = projectCount;
                response.templates = 33;
                response.exports = 33;
                res.json(response);
            });
        }

    }
}
